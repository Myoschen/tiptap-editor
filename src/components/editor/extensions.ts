import Dropcursor from '@tiptap/extension-dropcursor'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export function createExtensions(placeholder?: string) {
  return [
    StarterKit,
    Placeholder.configure({ placeholder }),
    Underline,
    Highlight,
    Image,
    Dropcursor,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
  ]
}
