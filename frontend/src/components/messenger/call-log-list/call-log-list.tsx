import { callLogsReducerAction, callLogsReducerState } from "@/redux/reducers/call-log-reducer/call-log-reducer"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { userDetail } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { AnimatePresence, motion } from "framer-motion"
import { Phone, Video } from "lucide-react"
import Image from "next/image"
import React, { FC } from "react"
import { useSelector } from "react-redux"

const CallLogList = () => {
  const dispatch = useAppDispatch()

  const { callLogs, isInitial: isInitialCallLogs } = useSelector(
    (state: { callLogs: callLogsReducerState }) => state.callLogs,
  )
  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )

  const selectCallLogMemberHandler = (userDetail?: userDetail) => {
    dispatch(callLogsReducerAction.selectCallLogMember(userDetail))
  }
  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      <AnimatePresence>
        {messengerSortType == "call" &&
          subSelectionType == "allCall" &&
          callLogs.map((callLog, index) => {
            return (
              <motion.div
                key={callLog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <CallLogCard {...callLog} onClickHandler={() => selectCallLogMemberHandler(callLog.participants[0])} />
              </motion.div>
            )
          })}
        {messengerSortType == "call" &&
          subSelectionType == "incomingCall" &&
          callLogs
            .filter((callLog) => callLog.isIncomingCall)
            .map((callLog, index) => {
              return (
                <motion.div
                  key={callLog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <CallLogCard
                    {...callLog}
                    onClickHandler={() => selectCallLogMemberHandler(callLog.participants[0])}
                  />
                </motion.div>
              )
            })}
        {messengerSortType == "call" &&
          subSelectionType == "outgoingCall" &&
          callLogs
            .filter((callLog) => !callLog.isIncomingCall)
            .map((callLog, index) => {
              return (
                <motion.div
                  key={callLog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <CallLogCard
                    {...callLog}
                    onClickHandler={() => selectCallLogMemberHandler(callLog.participants[0])}
                  />
                </motion.div>
              )
            })}
        {messengerSortType == "call" &&
          subSelectionType == "missedCall" &&
          callLogs
            .filter((callLog) => callLog.isMissedCall)
            .map((callLog, index) => {
              return (
                <motion.div
                  key={callLog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <CallLogCard
                    {...callLog}
                    onClickHandler={() => selectCallLogMemberHandler(callLog.participants[0])}
                  />
                </motion.div>
              )
            })}
      </AnimatePresence>
    </div>
  )
}

export default CallLogList

interface CallLogCardProps {
  _id: string
  callType: "private" | "group"
  isMissedCall: boolean
  mediaType: "audio" | "video"
  isIncomingCall: boolean
  startTime: string
  endTime: string
  duration: string
  callIntiatorUserId: string
  participants: userDetail[]
  onClickHandler(): void
}

const CallLogCard: FC<CallLogCardProps> = ({
  _id,
  callIntiatorUserId,
  callType,
  duration,
  endTime,
  isIncomingCall,
  isMissedCall,
  mediaType,
  startTime,
  participants,
  onClickHandler,
}) => {
  return (
    <div className="gap-3 relative flex  items-center" onClick={onClickHandler}>
      <div className="relative  w-14 aspect-square md:w-[20%] ">
        {participants.length == 1 && (
          <Image src={participants[0].profileImageUrl} alt="user-image" fill className="rounded-3xl" />
        )}
      </div>

      <div className="gap-1 flex flex-col  justify-center ">
        <div className="font-medium text-base ">
          {participants.map((participant) => {
            return <span key={participant._id}>{participant.name} </span>
          })}
        </div>

        <div className="gap-1 text-sm flex items-center  text-slate-800 dark:text-slate-200">
          {mediaType == "audio" ? <Phone className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          {new Date(startTime).toLocaleTimeString()}{" "}
        </div>
      </div>

      <div className="w-8 aspect-square rounded-full"></div>
    </div>
  )
}
