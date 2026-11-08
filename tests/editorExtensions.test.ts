// Proves the Tiptap 3 upgrade keeps the post editors' schema and commands
// working, and that the patched @tiptap/core (GHSA-cp6q-959q-f8rh) is in use.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Editor, mergeAttributes } from '@tiptap/core';
import { inlineEditorExtensions, postEditorExtensions } from '@/lib/editorExtensions';

const editors: Editor[] = [];

function makeEditor(extensions: ReturnType<typeof postEditorExtensions>, content = '') {
  const editor = new Editor({ element: document.createElement('div'), extensions, content });
  editors.push(editor);
  return editor;
}

afterEach(() => {
  while (editors.length) editors.pop()!.destroy();
  vi.restoreAllMocks();
});

describe('post editor extensions (Tiptap 3)', () => {
  it('registers every extension once (StarterKit link and underline are off)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    for (const build of [postEditorExtensions, inlineEditorExtensions]) {
      const editor = makeEditor(build());
      const names = editor.extensionManager.extensions.map((e) => e.name);
      expect(names.filter((n) => n === 'link')).toHaveLength(1);
      expect(names.filter((n) => n === 'underline')).toHaveLength(1);
      expect(new Set(names).size).toBe(names.length);
    }
    const duplicateWarnings = warn.mock.calls.filter((args) =>
      String(args[0]).toLowerCase().includes('duplicate'),
    );
    expect(duplicateWarnings).toEqual([]);
  });

  it('round-trips the stored HTML the admin editor produces', () => {
    const html = [
      '<h2>Heading</h2>',
      '<p style="text-align: center">Centered <u>underlined</u> text</p>',
      '<p><a target="_blank" rel="noopener noreferrer nofollow" class="text-[#A32015] underline font-medium hover:text-[#7f1810]" href="https://example.com">a link</a></p>',
      '<p><span style="color: rgb(163, 32, 21);">red</span> and <mark data-color="#fef08a" style="background-color: #fef08a; color: inherit;">marked</mark></p>',
      '<img class="rounded-md my-8" src="https://example.com/a.png">',
    ].join('');
    const editor = makeEditor(postEditorExtensions(), html);
    const out = editor.getHTML();
    expect(out).toContain('<h2>Heading</h2>');
    expect(out).toContain('text-align: center');
    expect(out).toContain('<u>underlined</u>');
    expect(out).toContain('href="https://example.com"');
    expect(out).toContain('color: rgb(163, 32, 21)');
    expect(out).toContain('<mark data-color="#fef08a"');
    expect(out).toContain('src="https://example.com/a.png"');
    // A second pass is stable, so saving an unchanged post does not rewrite it.
    expect(makeEditor(postEditorExtensions(), out).getHTML()).toBe(out);
  });

  it('runs the toolbar commands both editors use', () => {
    const editor = makeEditor(postEditorExtensions(), '<p>hello world</p>');
    editor.commands.selectAll();
    const ok = editor
      .chain()
      .toggleBold()
      .toggleUnderline()
      .setColor('#A32015')
      .toggleHighlight({ color: '#fef08a' })
      .setTextAlign('right')
      .setLink({ href: 'https://example.com' })
      .run();
    expect(ok).toBe(true);
    expect(editor.isActive('bold')).toBe(true);
    expect(editor.isActive('underline')).toBe(true);
    expect(editor.isActive('link')).toBe(true);
    expect(editor.getAttributes('textStyle').color).toBe('#A32015');
    const out = editor.getHTML();
    expect(out).toContain('text-align: right');
    expect(out).toContain('<strong>');

    editor.chain().selectAll().unsetColor().unsetLink().run();
    expect(editor.getAttributes('textStyle').color).toBeUndefined();
    expect(editor.isActive('link')).toBe(false);
  });

  it('limits the inline editor to h2 and h3', () => {
    const editor = makeEditor(inlineEditorExtensions(), '<h1>big</h1><h3>small</h3>');
    const out = editor.getHTML();
    expect(out).not.toContain('<h1>');
    expect(out).toContain('<h3>small</h3>');
  });

  it('ignores an own __proto__ key in mergeAttributes (GHSA-cp6q-959q-f8rh)', () => {
    const hostile = JSON.parse('{"__proto__": {"onclick": "alert(1)"}, "class": "x"}');
    const merged = mergeAttributes({ class: 'a' }, hostile);
    expect(merged.class).toBe('a x');
    expect('onclick' in merged).toBe(false);
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
  });
});
