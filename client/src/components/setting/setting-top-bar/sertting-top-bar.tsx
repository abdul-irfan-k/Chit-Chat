"use client"
import { ArrowBackIcon, CallIcon, EditIcon } from "@/constants/icon-constant"
import { useAppDispatch } from "@/store"
import React, { FC, useState } from "react"

interface SettingTopBarProps {
  backButtonClickHandler(): void
  editButtonClickHandler(): void
}
const SettingTopBar: FC<SettingTopBarProps> = ({ editButtonClickHandler, backButtonClickHandler }) => {
  const [showMoreOption, setShowMoreOption] = useState<boolean>(false)

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="relative  w-5 aspect-square" onClick={backButtonClickHandler}>
          <ArrowBackIcon />
        </div>
        <span>Setting</span>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative  w-5 aspect-square" onClick={editButtonClickHandler}>
          <EditIcon />
        </div>
        <div
          className="relative  w-5 aspect-square"
          onClick={() => {
            setShowMoreOption(!showMoreOption)
          }}
        >
          <CallIcon />
          {showMoreOption && (
            <div className="absolute gap-1 top-[100%] px-4 py-2 flex items-center rounded-md dark:bg-neutral-950 ">
              <div className="w-4 aspect-square">
                <CallIcon className="w-4 aspect-square" width="" height="" />
              </div>
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingTopBar
