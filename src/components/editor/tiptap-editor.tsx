'use client'

import './styles.css'

import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { Bold, Highlighter, Italic, List, ListOrdered, Redo, Strikethrough, UnderlineIcon, Undo } from 'lucide-react'

import { createExtensions } from './extensions'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
    <div className={cn('flex flex-col rounded-lg border bg-background shadow-sm focus-within:border-primary', className)}>
      {editor && <EditorToolbar editor={editor} />}
      <EditorContent className={cn('flex flex-1 flex-col', editorContentClassName)} editor={editor} />
    </div>
  )
}

interface EditorToolbarProps {
  editor: Editor
}

function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex h-12 items-center gap-x-1 overflow-x-auto border-b px-2 shadow-sm">
      {/* Bold */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle bold"
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Bold</span>
          <kbd className="font-sans text-xs font-medium">⌘ B</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Italic */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle italic"
              pressed={editor.isActive('italic')}
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Italic</span>
          <kbd className="font-sans text-xs font-medium">⌘ I</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Strikethrough */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle strikethrough"
              pressed={editor.isActive('strike')}
              onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Strikethrough</span>
          <kbd className="font-sans text-xs font-medium">⌘ ⇧ S</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Underline */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle underline"
              pressed={editor.isActive('underline')}
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Underline</span>
          <kbd className="font-sans text-xs font-medium">⌘ U</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Highlight */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle highlight"
              pressed={editor.isActive('highlight')}
              onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
            >
              <Highlighter className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Highlight</span>
          <kbd className="font-sans text-xs font-medium">⌘ ⇧ H</kbd>
        </TooltipContent>
      </Tooltip>
      <Separator className="h-6" orientation="vertical" />
      {/* Ordered List */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle ordered list"
              pressed={editor.isActive('orderedList')}
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Ordered List</span>
          <kbd className="font-sans text-xs font-medium">⌘ ⇧ 7</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Bullet List */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <div>
            <Toggle
              aria-label="Toggle bullet list"
              pressed={editor.isActive('bulletList')}
              onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Bullet List</span>
          <kbd className="font-sans text-xs font-medium">⌘ ⇧ 8</kbd>
        </TooltipContent>
      </Tooltip>
      <Separator className="h-6" orientation="vertical" />
      {/* Undo */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(ev) => {
              ev.preventDefault()
              editor.chain().focus().undo().run()
            }}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Undo</span>
          <kbd className="font-sans text-xs font-medium">⌘ Z</kbd>
        </TooltipContent>
      </Tooltip>
      {/* Redo */}
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(ev) => {
              ev.preventDefault()
              editor.chain().focus().redo().run()
            }}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="mr-1">Redo</span>
          <kbd className="font-sans text-xs font-medium">⌘ Y</kbd>
        </TooltipContent>
      </Tooltip>
      {/* TODO Table */}
      {/* <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(ev) => {
              ev.preventDefault()
              editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            }}
          >
            <TableIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Insert Table
        </TooltipContent>
      </Tooltip> */}
    </div>
  )
}
