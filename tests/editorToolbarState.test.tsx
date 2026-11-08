// The editors' toolbars read editor.isActive() and getAttributes() during
// render. Tiptap 3 stopped re-rendering on every transaction by default, which
// would leave those reads stale; the editors opt back in. This test renders with
// the editors' shared useEditor options and checks the toolbar state follows the selection.
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  appendBubbleMenuToBody,
  bubbleMenuOptions,
  editorRenderOptions,
  postEditorExtensions,
} from '@/lib/editorExtensions';

let captured: Editor | null = null;

function Probe() {
  const editor = useEditor({
    extensions: postEditorExtensions(),
    ...editorRenderOptions,
    content: '<p>hello</p>',
  });
  captured = editor;
  if (!editor) return <p>loading</p>;
  return (
    <div>
      <span data-testid="bold">{editor.isActive('bold') ? 'on' : 'off'}</span>
      <span data-testid="color">{editor.getAttributes('textStyle').color || 'none'}</span>
      <BubbleMenu editor={editor} options={bubbleMenuOptions} appendTo={appendBubbleMenuToBody}>
        <button type="button">B</button>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  );
}

afterEach(() => {
  cleanup();
  captured = null;
});

// The Probe also mounts the BubbleMenu exactly as the editors do: unstable
// options/appendTo props would make it loop (React error 185) on the first
// transaction, which this test would surface as a thrown render error.
it('re-renders the toolbar when a command changes the selection marks', async () => {
  render(<Probe />);
  await waitFor(() => expect(screen.getByTestId('bold').textContent).toBe('off'));

  act(() => {
    captured!.chain().selectAll().toggleBold().setColor('#A32015').run();
  });

  expect(screen.getByTestId('bold').textContent).toBe('on');
  expect(screen.getByTestId('color').textContent).toBe('#A32015');
});
