'use client'

import './styles.css'

import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { Bold, CaseSensitive, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter, Italic, LetterText, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from 'lucide-react'

import { EditorButton } from './components/editor-button'
import { EditorDropdownMenu } from './components/editor-dropdown-menu'
import { EditorSeparator } from './components/editor-separator'
import { EditorToggleButton } from './components/editor-toggle-button'
import { createExtensions } from './extensions'
import { cn } from '@/lib/utils'

interface TiptapProps {
  className?: string
  editorClassName?: string
  editorContentClassName?: string
  content: string
  onContentChange: (content: string) => void
  placeholder?: string
}

export function TiptapEditor({
  className,
  editorClassName,
  editorContentClassName,
  content,
  onContentChange,
  placeholder,
}: TiptapProps) {
  const editor = useEditor({
    content,
    onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
    extensions: createExtensions(placeholder),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: cn('prose flex-1 p-4 text-foreground dark:prose-invert focus:outline-none', editorClassName),
      },
    },
  })

  return (
    <div className={cn('flex flex-col rounded-lg border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background', className)}>
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent className={cn('flex flex-1 flex-col', editorContentClassName)} editor={editor} />
    </div>
  )
}

interface EditorToolbarProps {
  editor: Editor
}

function EditorToolbar({ editor }: EditorToolbarProps) {
  const styles = [
    {
      icon: CaseSensitive,
      label: 'Paragraph',
      shortcut: ['⌘', '⌥', '0'],
      onClick: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: Heading1,
      label: 'Heading 1',
      shortcut: ['⌘', '⌥', '1'],
      active: editor.isActive('heading', { level: 1 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: Heading2,
      label: 'Heading 2',
      shortcut: ['⌘', '⌥', '2'],
      active: editor.isActive('heading', { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Heading3,
      label: 'Heading 3',
      shortcut: ['⌘', '⌥', '3'],
      active: editor.isActive('heading', { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: Heading4,
      label: 'Heading 4',
      shortcut: ['⌘', '⌥', '4'],
      active: editor.isActive('heading', { level: 4 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      icon: Heading5,
      label: 'Heading 5',
      shortcut: ['⌘', '⌥', '5'],
      active: editor.isActive('heading', { level: 5 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    },
    {
      icon: Heading6,
      label: 'Heading 6',
      shortcut: ['⌘', '⌥', '6'],
      active: editor.isActive('heading', { level: 6 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    },
    {
      icon: ListOrdered,
      label: 'Ordered List',
      shortcut: ['⌘', '⇧', '7'],
      active: editor.isActive('orderedList'),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: List,
      label: 'Bullet List',
      shortcut: ['⌘', '⇧', '8'],
      active: editor.isActive('bulletList'),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
  ]

  const variants = [
    {
      icon: Bold,
      label: 'Bold',
      shortcut: ['⌘', 'B'],
      active: editor.isActive('bold'),
      onStateChange: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      label: 'Italic',
      shortcut: ['⌘', 'I'],
      active: editor.isActive('italic'),
      onStateChange: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Strikethrough,
      label: 'Strikethrough',
      shortcut: ['⌘', '⇧', 'S'],
      active: editor.isActive('strike'),
      onStateChange: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Underline,
      label: 'Underline',
      shortcut: ['⌘', 'U'],
      active: editor.isActive('underline'),
      onStateChange: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: Highlighter,
      label: 'Highlight',
      shortcut: ['⌘', '⇧', 'H'],
      active: editor.isActive('highlight'),
      onStateChange: () => editor.chain().focus().toggleHighlight().run(),
    },
  ]

  const actions = [
    {
      icon: Undo,
      label: 'Undo',
      shortcut: ['⌘', 'Z'],
      disabled: !editor.can().chain().focus().undo().run(),
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo,
      label: 'Redo',
      shortcut: ['⌘', 'Y'],
      disabled: !editor.can().chain().focus().redo().run(),
      onClick: () => editor.chain().focus().redo().run(),
    },
  ]

  return (
    <div className="flex h-12 items-center gap-x-1 overflow-x-auto border-b px-2 shadow-sm">
      <EditorDropdownMenu icon={LetterText} label="Text Style" items={styles} />
      <EditorSeparator />
      {variants.map((variant, index) => (<EditorToggleButton key={index}{...variant} />))}
      <EditorSeparator />
      {actions.map((action, index) => (<EditorButton key={index}{...action} />))}
    </div>
  )
}
