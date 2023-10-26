"use client"
import Image from "next/image"
import VolumeHighSvg from "/public/Asset/Icon/volume-high.svg"
import SearchSvg from "/public/Asset/Icon/magnifying-glass.svg"
import PhoneSvg from "/public/Asset/Icon/phone.svg"
import VideoSvg from "/public/Asset/Icon/video.svg"

import { FC, useEffect } from "react"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store"
import { videoCallRequestHandler } from "@/redux/actions/call-request-action/call-request-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"

interface ChatProfileInstance {
  name: string
  profileImageSrc: string
  currentStatus: "online" | "ofline"
}

const ChatProfile: FC<ChatProfileInstance> = ({ name, profileImageSrc, currentStatus }) => {
  const { socket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const dispatch = useAppDispatch()

  const videoCallIconClickHandler = () => {
    console.log("current user deatil", currentUserDetail?.chatRoom?.chatRoomId, "user", userDetail)
    socket.emit("videoCall:intialise", {
      userDetail: userDetail,
      chatRoomId: currentUserDetail?.chatRoom?.chatRoomId,
      receiverId: currentUserDetail?._id,
    })
    dispatch(
      videoCallRequestHandler({
        callType: "videoCall",
        chatRoomId: currentUserDetail?.chatRoom?.chatRoomId,
        userDetail: currentUserDetail,
      }),
    )
  }


  return (
    <div className=" px-5 py-5   rounded-md flex items-center bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50">
      <div className="relative w-[8%]  aspect-square ">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-3xl" />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            " bg-yellow-300"
          }
        ></div>
      </div>
      <div className="gap-2 flex flex-col ml-5 ">
        <div className="font-medium text-slate-950 dark:text-slate-50">{name}</div>
        {currentStatus == "online" && (
          <div className="px-3 py-2 flex items-center justify-center rounded-full bg-green-500 ">online</div>
        )}
        {currentStatus == "ofline" && (
          <div className="px-3 py-1 flex items-center justify-center rounded-full bg-pink-500">ofline</div>
        )}
      </div>

      <div className="relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <VolumeHighSvg className="aspect-square p-3" />
      </div>
      <div className="relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <SearchSvg className="aspect-square p-3" />
      </div>
      <div className="relative ml-auto flex items-center justify-center bg-slate-300 rounded-full dark:bg-slate-800">
        <PhoneSvg className="aspect-square p-3" />
      </div>
      <div className="relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <PhoneSvg className="aspect-square p-3" />
      </div>
      <div
        onClick={videoCallIconClickHandler}
        className="relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
      >
        <VideoSvg className="aspect-square p-3" />
      </div>
    </div>
  )
}

export default ChatProfile
