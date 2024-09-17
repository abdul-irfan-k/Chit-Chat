import { PhoneIncoming, PhoneMissed, PhoneOutgoing, Trash } from "lucide-react"
import React, { FC } from "react"

interface CallHistoryProps {
  callHistoryData: Array<CallHistoryCard>
}
const CallHistory: FC<CallHistoryProps> = ({ callHistoryData }) => {
  return (
    <div className="gap-5 flex flex-col-reverse h-full ">
      <div className="gap-2 py-14 w-full  h-[10%]  fill-red-500 text-red-500 flex flex-col justify-center items-center bg-background-primary rounded-md ">
        <div className="relative ">
          <Trash className="w-5 aspect-square" />
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
  _id: string
  callType: "private" | "group"
  mediaType: "audio" | "video"
  isMissedCall: boolean
  isIncomingCall: boolean
  startTime: string
  endTime: string
  duration: string
}
const CallHistoryCard: FC<CallHistoryCard> = ({
  callType,
  _id,
  duration,
  endTime,
  isIncomingCall,
  isMissedCall,
  mediaType,
  startTime,
}) => {
  return (
    <div className="gap-2 px-10 py-5 rounded-sm flex items-center bg-background-primary fill-slate-950  dark:fill-slate-50">
      <div className="relative w-8 aspect-square flex justify-center items-center">
        {isMissedCall ? <PhoneMissed /> : isIncomingCall ? <PhoneIncoming /> : <PhoneOutgoing />}
      </div>
      <div className="font-medium text-lg text-slate-950 dark:text-slate-50">
        {isMissedCall ? "Missed Call" : isIncomingCall ? "Incoming Call" : "Outgoing Call"}
      </div>
      <div className="ml-auto text-sm text-slate-800 dark:text-slate-200">
        {new Date(startTime).toLocaleDateString()}
      </div>
    </div>
  )
}
