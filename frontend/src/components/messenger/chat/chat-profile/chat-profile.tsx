"use client"
import Image from "next/image"

import { FC, MouseEvent, useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { ArrowLeftIcon, PhoneIcon, SearchIcon, VideoIcon, VolumeHighIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { callInitialiseHandler, callRequestHandler } from "@/redux/actions/call-action/call-action"
import { generateUUIDString } from "@/util/uuid"

interface ChatProfileInstance {
  name: string
  profileImageSrc: string
  currentStatus: "online" | "ofline"
  backButtonHandler?(): void
  onClickHandler?(): void
}

const ChatProfile: FC<ChatProfileInstance> = ({
  name,
  profileImageSrc,
  currentStatus,
  backButtonHandler,
  onClickHandler,
}) => {
  const { socket } = useSocketIoContext()
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const dispatch = useAppDispatch()

  const callInitiate = (e: MouseEvent<HTMLDivElement, MouseEvent>, mediaType: "audio" | "video") => {
    e.stopPropagation()

    if (currentChaterDetail?.currentChaterType == "user") {
      dispatch(
        callInitialiseHandler(
          {
            callType: "private",
            mediaType,
            callerDetails: userDetail,
            chatRoomId: currentChaterDetail.chatRoomId,
            requestType: "outgoing",
            communicatorsDetail: { ...currentChaterDetail },
          },
          socket,
        ),
      )
    }
  }

  return (
    <div
      className="w-full    rounded-md flex items-center bg-slate-200 fill-slate-950 dark:bg-background-primary dark:fill-slate-50 p-5 sm:p-3 md:p-5"
      onClick={onClickHandler}
    >
      <div className="block md:hidden">
        <div
          className=" relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={backButtonHandler}
        >
          <ArrowLeftIcon className="aspect-square w-7" width="" height="" />
        </div>
      </div>
      <div className="ml-2 relative   w-[10%]   aspect-square md:w-[6%] md:ml-0">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-3xl" />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            " bg-yellow-300"
          }
        ></div>
      </div>
      <div className="gap-2 flex flex-col ml-3 ">
        <div className="font-medium text-lg  text-slate-950 dark:text-slate-50 ">{name}</div>
        <div className="hidden md:block">
          {currentStatus == "online" && <div className="  flex items-center justify-center rounded-full ">online</div>}
          {currentStatus == "ofline" && (
            <div className="  flex items-center justify-center rounded-full text-green-500 ">online</div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="ml-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
          <VolumeHighIcon className="aspect-square p-3" />
        </div>
      </div>
      <div className="ml-auto mr-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <SearchIcon className="aspect-square p-3" />
      </div>
      <div
        className="mr-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        onClick={(e) => callInitiate(e, "audio")}
      >
        <PhoneIcon className="aspect-square p-3" />
      </div>
      <div
        onClick={(e) => callInitiate(e, "video")}
        className=" relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
      >
        <VideoIcon className="aspect-square p-3" />
      </div>
    </div>
  )
}

export default ChatProfile
