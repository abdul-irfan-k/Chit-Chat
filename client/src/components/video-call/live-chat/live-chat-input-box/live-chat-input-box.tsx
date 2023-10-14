import { EmojiIcon, PlusIcon, SendIcon } from "@/constants/icon-constant"
import React from "react"

const LiveChatInputBox = () => {
  return (
    <div className="gap-3 mt-5 flex ">
      <div className="w-10 py-2  flex justify-center items-center rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
        <PlusIcon className="aspect-square w-6" height="" width="" />
      </div>
      <div className="px-4 py-2 rounded-md flex-1 bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 ">
        <div className="gap-2 flex justify-between items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Message"
              className="bg-slate-300 dark:bg-neutral-900 text-sm w-full outline-none border-none"
            />
          </div>
          <div className="relative w-6 aspect-square">
            <EmojiIcon className="w-6 aspect-square" />
          </div>
        </div>
      </div>
      <div className="w-6 py-2  items-center fill-slate-950 dark:fill-slate-50">
        <SendIcon className="aspect-square w-6" height="" width="" />
      </div>
    </div>
  )
}

export default LiveChatInputBox
