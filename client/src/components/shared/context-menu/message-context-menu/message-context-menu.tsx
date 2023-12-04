import { DeleteIcon } from "@/constants/icon-constant"
import React, { FC, useState } from "react"

interface MessageContextMenuProps {
  xPosition:number
  yPosition:number
}
const MessageContextMenu: FC<MessageContextMenuProps> = ({xPosition,yPosition}) => {
  return (
    <div >
        <div
        className="fixed gap-2 px-4 py-2 w-[10vw] h-44 left-0 top-0 rounded-md flex flex-col dark:bg-neutral-700 z-[110] "
        style={{ transform:`translate(${xPosition}px, ${yPosition}px)`}}
        >
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Reply</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Copy</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Pin</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Forward</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Select</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>delete</span>
          </div>
        </div>
    </div>
  )
}

export default MessageContextMenu
