import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import React, { FC, useState } from "react"

const switchVariants = cva(
  "w-11 h-6 bg-gray-200 rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
  {
    variants: {
      variant: {
        primary: "bg-primary ",
        green: "peer-checked:bg-[#42cb34] peer-checked:bg-[#42cb34] after:bg-[#42cb34] peer-checked:after:bg-white",
      },
    },
  },
)
interface SwitchProps extends VariantProps<typeof switchVariants> {
  enabled: boolean
  onChange?: (enabled: boolean) => void
  className?: string
}
const Switch: FC<SwitchProps> = ({ enabled, onChange, className, variant }) => {
  const [isEnabled, setIsEnabled] = useState(enabled)

  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isEnabled}
        onChange={() => {
          setIsEnabled(!isEnabled)
          onChange?.call(null, !isEnabled)
        }}
      />
      <div className={cn(switchVariants({ variant, className }))}></div>
    </label>
  )
}

export default Switch
