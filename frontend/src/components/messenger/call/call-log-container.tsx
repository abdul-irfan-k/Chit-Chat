"use client"
import React, { useEffect, useState } from "react"
import CallUserProfile from "./call-user-profile/call-user-profile"
import CallSharedDocument from "./call-shared-document/call-shared-document"
import CallHistory from "./call-history/call-history"
import { useSelector } from "react-redux"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { callLogsReducerState } from "@/redux/reducers/call-log-reducer/call-log-reducer"
import CircleSpinner from "@/components/shared/circle-spinner/circle-spinner"
import { getChatRoomCallLogs } from "@/redux/actions/call-action/call-action"

const CallLogContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  const { selectedCallLogMember } = useSelector((state: { callLogs: callLogsReducerState }) => state.callLogs)

  const [callLogs, setCallLogs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (selectedCallLogMember?._id == undefined) return
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await getChatRoomCallLogs(selectedCallLogMember?.chatRoomId)
        setCallLogs(data)
      } catch (error) {}
      setLoading(false)
    })()
  }, [selectedCallLogMember?._id])

  return (
    <>
      {messengerSortType == "call" && selectedCallLogMember && (
        <div className="relative mt-10  gap-8 flex  w-[90%] overflow-y-hidden xl:h-[75vh]">
          <div className="gap-5 flex flex-col w-[40%]">
            <CallUserProfile {...selectedCallLogMember} phoneNumber="123 456 789" />
            <CallSharedDocument
              sharedDocuments={[{ name: "Simple_practice_project-zip" }, { name: "test.jpg" }, { name: "image.jpg" }]}
            />
          </div>
          <div className="relative flex-1 ">
            <div className="absolute w-full h-full ">
              {loading && <CircleSpinner />}
              <CallHistory
                // callHistoryData={[
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "missedCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "outgoingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                //   { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
                // ]}
                callHistoryData={callLogs}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CallLogContainer
