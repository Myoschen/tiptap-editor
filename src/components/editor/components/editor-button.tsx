import type { ForwardRefExoticComponent } from 'react'

import { Shortcut } from './shortcut'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface EditorButtonProps {
  icon: ForwardRefExoticComponent<{ className?: string }>
  label: string
  shortcut?: string[]
  onClick: () => void
  disabled?: boolean
}

export function EditorButton(props: EditorButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <Button
          variant="ghost"
          size="icon"
          onClick={(ev) => {
            ev.preventDefault()
            props.onClick()
          }}
          disabled={props.disabled}
        >
          <props.icon className="size-4" />
        </Button>
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
