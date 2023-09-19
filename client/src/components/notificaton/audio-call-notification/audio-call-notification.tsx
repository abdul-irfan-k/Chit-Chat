"use client"

import Image from "next/image"
import React, { FC, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

interface AudioCallNotificationProps {
  outSideClickHandler(): void
}

const AudioCallNotification: FC<AudioCallNotificationProps> = ({ outSideClickHandler }) => {
  const isAvilableNotification = useSelector((state: any) => state.audioCallNotification?.isAvilableNotification)
  const AudioCallNotificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [isAvilableNotification])

  useEffect(() => {
    document.addEventListener("click", handleOutSideClick)

    return () => {
      document.removeEventListener("click", handleOutSideClick)
    }
  })

  const handleOutSideClick: any = (event: React.MouseEvent) => {
    if (AudioCallNotificationRef.current && !AudioCallNotificationRef.current.contains(event.target as Node)) {
      outSideClickHandler()
    }
  }

  return (
    <div>
      {isAvilableNotification && (
        <div
          ref={AudioCallNotificationRef}
          className="relative w-full px-10 py-5  rounded-2xl bg-opacity-80 bg-clip-padding dark:bg-neutral-900 z-40 "
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-between">
              <div className="text-sm text-slate-700 dark:text-slate-200 ">incoming call</div>
              <div className="text-2xl font-medium">Irfan</div>
            </div>
            <div className="relative w-16 aspect-square">
              <Image src={"/Asset/avatar.jpg"} fill alt="image" className="rounded-md" />
            </div>
          </div>

          <div className="mt-5 gap-10 flex text-slate-50">
            <div className="py-2 flex-1 rounded-xl text-center bg-red-500">Decline</div>
            <div className="py-2 flex-1 rounded-xl text-center bg-green-500">Accept</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AudioCallNotification
