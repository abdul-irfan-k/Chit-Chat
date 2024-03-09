import MeetingJoinForm from "@/components/create-meeting-form/meeting-join-form/meeting-join-form"
import React from "react"

const VideoCallReferencePage = ({ params }: { params: { referenceId: string } }) => {
  return (
    <div className="px-5 flex items-center w-full  h-full ">
      <MeetingJoinForm meetingCode={params.referenceId} />
    </div>
  )
}

export default VideoCallReferencePage
