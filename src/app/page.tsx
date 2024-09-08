'use client'

import { useState } from 'react'

import { TiptapEditor } from '@/components/editor/tiptap-editor'
import { useDebounceCallback } from '@/hooks/use-debounce-callback'

const DELAY = 500 as const

export default function Home() {
  const [content, setContent] = useState('')

  const handleChange = useDebounceCallback(setContent, DELAY)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-8 px-4 py-8">
      <h1 className="text-4xl font-bold">Tiptap Editor</h1>
      <TiptapEditor
        className="h-[450px] w-full max-w-xl"
        editorContentClassName="overflow-auto"
        content={content}
        onContentChange={handleChange}
        placeholder="Writing..."
      />
    </main>
  )
}
