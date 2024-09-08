import type { ForwardRefExoticComponent } from 'react'

import { Shortcut } from './shortcut'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface EditorToggleButtonProps {
  icon: ForwardRefExoticComponent<{ className?: string }>
  label: string
  shortcut?: string[]
  active: boolean
  onStateChange: () => void
}

export function EditorToggleButton(props: EditorToggleButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <div>
          <Toggle
            aria-label={`Toggle ${props.label}`}
            pressed={props.active}
            onPressedChange={props.onStateChange}
          >
            <props.icon className="size-4" />
          </Toggle>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span className="mr-1">{props.label}</span>
        {props.shortcut && (
          <div className="inline-flex items-center gap-x-0.5">
            {props.shortcut.map((key, index) => (<Shortcut key={index}>{key}</Shortcut>))}
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
