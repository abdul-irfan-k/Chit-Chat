import { CamaraIcon, PersonIcon, VideoIcon } from "@/constants/icon-constant"
import React, { FC, useRef, useState } from "react"
import PreviewSelectedImage from "../image-selection/image-selection"
import { axiosUploadInstance } from "@/constants/axios"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { useSelector } from "react-redux"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import ImageSelection from "../image-selection/image-selection"
import PollCreationBox from "../poll-creation-box/poll-creation-box"
import useOutsideClick from "@/hooks/use-outside-click/use-outside-click"

interface InputSelectionBoxProps {
  outsideClickHandler(): void
}
const InputSelectionBox: FC<InputSelectionBoxProps> = ({ outsideClickHandler }) => {
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const inputSelectionBoxRef = useRef<HTMLDivElement>(null)
  useOutsideClick(inputSelectionBoxRef, () => {
    outsideClickHandler()
  })

  return (
    <div
      className="absolute px-8 py-5 rounded-lg gap-1 flex flex-col bottom-[200%] bg-slate-300  dark:bg-neutral-950"
      ref={inputSelectionBoxRef}
    >
      <ImageSelection currentChaterDetail={currentChaterDetail} userDetail={userDetail} />
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <CamaraIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Camara</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <VideoIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Video</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Location</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Document</span>
      </div>
      <PollCreationBox />
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Attach</span>
      </div>
    </div>
  )
}

export default InputSelectionBox
