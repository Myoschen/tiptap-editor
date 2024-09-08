import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ShortcutProps {
  className?: string
  children: ReactNode
}

export function Shortcut({ className, children }: ShortcutProps) {
  return (
    <kbd className={cn('inline-block min-w-3 text-center align-baseline font-sans text-xs font-medium text-muted-foreground', className)}>
      {children}
    </kbd>
  )
}
