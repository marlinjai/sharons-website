// lib/editorExtensions.ts
// Tiptap 3 extension lists for the two post editors, kept in one place so the
// components and the tests build exactly the same schema.

import type { Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

const LINK_CLASS = 'text-[#A32015] underline font-medium hover:text-[#7f1810]';

// Tiptap 3's StarterKit bundles Link and Underline. They are switched off here
// because both editors register their own configured instances; leaving them on
// would register each extension twice.
function starterKit(levels: (1 | 2 | 3 | 4)[]) {
  return StarterKit.configure({
    heading: { levels },
    link: false,
    underline: false,
  });
}

function link() {
  return Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: LINK_CLASS },
  });
}

/** Extensions for the full admin editor (components/admin/PostEditor.tsx). */
export function postEditorExtensions(): Extensions {
  return [
    starterKit([1, 2, 3, 4]),
    link(),
    Image.configure({
      HTMLAttributes: { class: 'rounded-md my-8' },
    }),
    Placeholder.configure({
      placeholder: 'Start writing your post... Select text to format.',
    }),
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
  ];
}

/** Extensions for the inline editor on the blog listing (components/blog/InlinePostEditor.tsx). */
export function inlineEditorExtensions(): Extensions {
  return [
    starterKit([2, 3]),
    link(),
    Placeholder.configure({
      placeholder: 'Write your post content...',
    }),
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TextStyle,
    Color,
  ];
}

/**
 * useEditor render options shared by both editors. Tiptap 3 changed two
 * defaults: render only on the client (avoids a hydration mismatch under
 * Next.js), and re-render on every transaction so the toolbars' isActive() and
 * getAttributes() reads stay current, as they did in Tiptap 2.
 */
export const editorRenderOptions = {
  immediatelyRender: false,
  shouldRerenderOnTransaction: true,
} as const;

/**
 * Props for the editors' Tiptap 3 BubbleMenu. They must be stable references:
 * BubbleMenu dispatches an "updateOptions" transaction whenever `options` or
 * `appendTo` change identity, and with shouldRerenderOnTransaction every
 * transaction re-renders the editor. An inline object literal would therefore
 * loop forever (React error 185, maximum update depth exceeded).
 */
export const bubbleMenuOptions = { placement: 'top' } as const;
export const appendBubbleMenuToBody = () => document.body;
