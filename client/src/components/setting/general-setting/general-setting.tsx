import { ArrowBackIcon } from "@/constants/icon-constant"
import React, { FC } from "react"
import NormalSetting from "./normal-setting/normal-setting"
import ColorThemeSetting from "./color-theme-setting/color-theme-setting"
import KeyboardAndTimeSetting from "./keyboard-and-time-setting/keyboard-and-time-setting"

interface GeneralSettingProps {
  backButtonHandler(): void
}
const GeneralSetting: FC<GeneralSettingProps> = ({ backButtonHandler }) => {
  return (
    <div className="overflow-y-scroll h-screen no-scrollbar ">
      <div className="fixed gap-3 py-2 flex items-center bg-neutral-950 z-[20] w-full">
        <div className="w-6 aspect-square" onClick={backButtonHandler}>
          <ArrowBackIcon className="w-6 aspect-square" />
        </div>
        <span className="font-semibold text-xl">General</span>
      </div>
      <div className="py-5 gap-2">
        <NormalSetting />
        <ColorThemeSetting />
        <KeyboardAndTimeSetting />
      </div>
    </div>
  )
}

export default GeneralSetting
