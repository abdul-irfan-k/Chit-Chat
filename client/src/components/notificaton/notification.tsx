"use client"
import { useState } from "react"
import AudioCallNotification from "./audio-call-notification/audio-call-notification"

const Notification = () => {
  const [isPopUpedNotification, setIsPopUpedNotification] = useState(false)

  const outSideClickHandler = () => {
    setIsPopUpedNotification(false)
  }
  return (
    <div>
      <div className="fixed left-[50%] top-5 translate-x-[-50%] w-[40%] z-40">
        {isPopUpedNotification && <AudioCallNotification outSideClickHandler={outSideClickHandler} />}
      </div>
      {isPopUpedNotification && (
        <div className="fixed left-0 top-0 w-screen h-screen z-30" style={{ background: "rgba(0,0,0,.4)" }}></div>
      )}
    </div>
  )
}

export default Notification
