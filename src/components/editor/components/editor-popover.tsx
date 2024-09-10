import type { ForwardRefExoticComponent } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface EditorPopoverProps {
  icon: ForwardRefExoticComponent<{ className?: string }>
  label: string
  children: React.ReactNode
  contentClassName?: string
}

export function EditorPopover(props: EditorPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <div>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <Button
                variant="ghost"
                size="icon"
              >
                <props.icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {props.label}
            </TooltipContent>
          </Tooltip>
        </div>
      </PopoverTrigger>
      <PopoverContent className={props.contentClassName} align="start">
        {props.children}
      </PopoverContent>
    </Popover>
  )
}
