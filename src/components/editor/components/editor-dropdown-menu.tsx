import type { ForwardRefExoticComponent } from 'react'
import { ChevronDown } from 'lucide-react'

import { Shortcut } from './shortcut'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type EditorDropdownItem = {
  icon?: ForwardRefExoticComponent<{ className?: string }>
  label: string
  shortcut?: string[]
  active?: boolean
  onClick: () => void
}

export interface EditorDropdownMenuProps {
  icon: ForwardRefExoticComponent<{ className?: string }>
  label: string
  items: EditorDropdownItem[]
}

export function EditorDropdownMenu(props: EditorDropdownMenuProps) {
  const active = props.items.map(i => i.active).some(Boolean)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <div>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <Button className="gap-x-1" variant={active ? 'secondary' : 'ghost'} size="sm">
                <props.icon className="size-4" />
                <ChevronDown className="size-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {props.label}
            </TooltipContent>
          </Tooltip>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {props.items.map((item, index) => (
          <DropdownMenuItem key={index} className="gap-x-4" onSelect={item.onClick}>
            <div className="inline-flex flex-1 items-center gap-x-2">
              {item.icon && <item.icon className="size-4" />}
              <span>{item.label}</span>
            </div>
            {item.shortcut && (
              <div className="inline-flex items-center gap-x-0.5">
                {item.shortcut.map((key, index) => (<Shortcut key={index}>{key}</Shortcut>))}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
