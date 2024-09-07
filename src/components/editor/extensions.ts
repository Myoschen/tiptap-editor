import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export function createExtensions(placeholder?: string) {
  return [
    StarterKit,
    Placeholder.configure({ placeholder }),
    Underline,
    Highlight,
    // Table.configure({ resizable: true }),
    // TableRow,
    // TableHeader,
    // TableCell,
  ]
}
