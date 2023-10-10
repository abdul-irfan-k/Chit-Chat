"use client"
import React from "react"
import CallUserProfile from "./call-user-profile/call-user-profile"
import CallSharedDocument from "./call-shared-document/call-shared-document"
import CallHistory from "./call-history/call-history"
import { useSelector } from "react-redux"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"

const CallLogContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  return (
    <>
  {messengerSortType =="call" && <div className="relative mt-10  gap-8 flex  w-[60%] overflow-y-hidden xl:h-[75vh]">
      <div className="gap-5 flex flex-col w-[40%]">
        <CallUserProfile name="irfan" phoneNumber="123 456 789" profileImageSrc="/Asset/avatar.jpg" />
        <CallSharedDocument
          sharedDocument={[{ name: "Simple_practice_project-zip" }, { name: "test.jpg" }, { name: "image.jpg" }]}
        />
      </div>
      <div className="relative flex-1 ">
        <div className="absolute w-full h-full ">
          <CallHistory
            callHistoryData={[
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "missedCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "outgoingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
              { callType: "incomingCall", duration: "10min", time: new Date(), callStreamType: "audioCall" },
            ]}
          />
        </div>
      </div>
    </div>}
    </>
  )
}

export default CallLogContainer
