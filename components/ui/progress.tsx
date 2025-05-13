"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number
  indicatorClassName?: string
  color?: string
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <div className="relative">
      {/* Offset shadow effect */}
      <div className={cn(
        "absolute bg-black h-2 w-full rounded-none translate-x-1 translate-y-1",
        className
      )} />

      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-white relative h-2 w-full overflow-hidden rounded-none border-2 border-black",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full w-full flex-1 transition-all",
            indicatorClassName
          )}
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>

    </div>
  )
}

export { Progress }
