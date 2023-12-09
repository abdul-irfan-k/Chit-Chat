import { ArrowBackIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

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
        <span className="font-semibold text-xl">Notifications</span>
      </div>
      <div className="py-5 block"></div>
    </div>
  )
}

export default GeneralSetting
