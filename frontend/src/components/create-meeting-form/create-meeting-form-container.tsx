"use client"
import React, { useState } from "react"
import CreateMeetingInitialForm from "./create-meeting-intial-form/create-viideo-call-intial-form"
import CreateMeetingWithFriendForm from "./create-meeting-with-freind-form/meeting-with-friend-form"
import CreateGroupMeetingForm from "./create-group-meeting-from/create-group-meeting-from"
import MeetingJoinForm from "./meeting-join-form/meeting-join-form"

const CreateMeetingFormContainer = () => {
  const [meetingFormType, setMeetingFormType] = useState<
    "freindMeeting" | "groupMeeting" | "classRoomMeeting" | undefined
  >(undefined)

  return (
    <div className="px-5 flex items-center w-full  h-full ">
      {meetingFormType == undefined && <CreateMeetingInitialForm setMeetingFormType={setMeetingFormType} />}
      {meetingFormType == "freindMeeting" && <CreateMeetingWithFriendForm />}
      {meetingFormType == "groupMeeting" && <CreateGroupMeetingForm />}
      
    </div>
  )
}

export default CreateMeetingFormContainer
