import { GearIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

const PremiumFeatureList = () => {
  return (
    <div>
      <div className="gap-1 flex flex-col">
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
        <PremiumFeatureRow
          title="Name And Profile Colors"
          description="Choose a color and logo for your profile and replies to your messages."
        >
          <GearIcon className="w-5 aspect-square" width="" height="" />
        </PremiumFeatureRow>
      </div>
    </div>
  )
}

export default PremiumFeatureList

interface PremiumFeatureRowProps {
  children: React.ReactNode
  className?: string
  title: string
  description?: string
}
const PremiumFeatureRow: FC<PremiumFeatureRowProps> = ({ children, title, className, description }) => {
  return (
    <div className="flex items-center">
      <div
        className={
          "w-8 aspect-square rounded-md flex items-center justify-center overflow-hidden fill-slate-50 " + className !=
          undefined
            ? className
            : ""
        }
      >
        {children}
      </div>

      <div className="gap-1 flex flex-col">
        <span className="text-base ">{title}</span>
        {description != undefined && <span className="text-base text-slate-300 ">{description}</span>}
      </div>
    </div>
  )
}
