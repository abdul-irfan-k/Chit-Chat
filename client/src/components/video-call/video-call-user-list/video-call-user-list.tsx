import { PersonAddIcon, SearchIcon, XMarkIcon } from "@/constants/icon-constant"
import { callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"
import React from "react"
import { useSelector } from "react-redux"

const VideoCallUserList = () => {
  const { connectionRequiredPeers } = useSelector((state: { callRedcuer: callReducerSlate }) => state.callRedcuer)

  return (
    <div className="px-5 py-3 rounded-sm w-full h-full bg-slate-200 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">Meeting details</div>
        <div onClick={onCloseButtonHandler}>
          <XMarkIcon />
        </div>
      </div>
      <div className="mt-5 items-start px-3 py-2 rounded-full flex items-center">
        <PersonAddIcon className="w-5" />
        Add People
      </div>

      <div className="mt-5 gap-1 flex items-center">
        <SearchIcon />
        <div className="flex-1 bg-slate-300 dark:bg-neutral-800">
          <input
            type="text"
            className=" outline-none rounded-full border-none text-base font-medium bg-slate-300 dark:bg-neutral-800 hover:border-none "
            placeholder="enter the code"
          />
        </div>
      </div>

      <div className="gap-2 mt-5 flex flex-col">
        <div>Join Request</div>
        {connectionRequiredPeers?.allPeers.map((peerDetail, index) => {
          return (
            <div className="flex justify-between items-center" key={index}>
              <div>{peerDetail.peerId}</div>
              <div className="gap-2 flex items-center">
                <div className="px-3 py-2  items-start bg-blue-500 rounded-full ">add</div>
                <div className="px-3 py-2  items-start bg-red-500 rounded-full ">remove</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoCallUserList
