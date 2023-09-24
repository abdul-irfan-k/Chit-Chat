import { CallMadeIcon, CallMissedIcon, CallReceivedIcon, DeleteIcon } from "@/constants/icon-contant"
import React, { FC } from "react"

interface CallHistoryProps {
  callHistoryData: Array<CallHistoryCard>
}
const CallHistory: FC<CallHistoryProps> = ({ callHistoryData }) => {
  return (
    <div className="gap-5 flex flex-col-reverse h-full ">
      <div className="gap-2 py-14 w-full  h-[10%]  fill-red-500 text-red-500 flex flex-col justify-center items-center bg-slate-200 rounded-md dark:bg-neutral-950">
        <div className="relative ">
          <DeleteIcon className="w-8 aspect-square" height="" width="" />
        </div>
        <div className="text-base">Delete Call Log</div>
      </div>
      <div className="relative h-[90%] block">
        <div className="gap-3 w-full block  h-[100%] flex flex-col  overflow-y-scroll">
          {callHistoryData.map((callHistory, index) => {
            return <CallHistoryCard key={index} {...callHistory} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CallHistory

interface CallHistoryCard {
  callType: "incomingCall" | "outgoingCall" | "missedCall"
  callStreamType?: "audioCall" | "videoCall"
  duration: string | undefined
  time: Date
}
const CallHistoryCard: FC<CallHistoryCard> = ({ callType, callStreamType, duration, time }) => {
  return (
    <div className="gap-2 px-10 py-5 rounded-sm flex items-center bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50">
      <div className="relative w-8 aspect-square flex justify-center items-center">
        {callType == "incomingCall" && <CallReceivedIcon className="w-8 aspect-square" height="" width="" />}
        {callType == "outgoingCall" && <CallMadeIcon className="w-8 aspect-square" height="" width="" />}
        {callType == "missedCall" && <CallMissedIcon className="w-8 aspect-square" height="" width="" />}
      </div>
      <div className="font-medium text-lg text-slate-950 dark:text-slate-50">
        {callType == "incomingCall"
          ? "Incoming Call"
          : (callType == "outgoingCall" ? "Outgoing Call" : (callType == "missedCall" ? "Missed Call" : ""))}
      </div>
      <div className="ml-auto text-sm text-slate-800 dark:text-slate-200">{time.toLocaleDateString()}</div>
    </div>
  )
}
