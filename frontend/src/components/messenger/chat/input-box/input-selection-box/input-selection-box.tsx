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
import { Camera, Code, File, Map, MapPinHouse } from "lucide-react"
import { motion } from "framer-motion"

interface InputSelectionBoxProps {
  outsideClickHandler(): void
  isActive: boolean
}
const InputSelectionBox: FC<InputSelectionBoxProps> = ({ outsideClickHandler, isActive }) => {
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUsersListReducerState }) => state.chatUserAndGroupList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const inputSelectionBoxRef = useRef<HTMLDivElement>(null)
  useOutsideClick(inputSelectionBoxRef, () => {
    outsideClickHandler()
  })

  return (
    <motion.div
      className="absolute  rounded-lg gap-1 flex flex-col bottom-[100%] overflow-hidden bg-slate-300  dark:bg-background-primary"
      ref={inputSelectionBoxRef}
      variants={{
        initial: {
          width: "0",
          height: "0",
        },
        active: {
          width: "auto",
          height: "auto",
          padding: "1.25rem 2.5rem 1.25rem 1.25rem",
        },
      }}
      initial="initial"
      animate={isActive ? "active" : "initial"}
      transition={{ duration: "0.3", ease: "easeOut" }}
    >
      <ImageSelection currentChaterDetail={currentChaterDetail} userDetail={userDetail} />
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <Camera className="w-5 aspect-square" />
        </div>
        <span className="text-base">Camara</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-5 aspect-square">
          <Code className="w-5 aspect-square" />
        </div>
        <span className="text-base">Code</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-5 aspect-square">
          <MapPinHouse className="w-5 aspect-square" />
        </div>
        <span className="text-base">Location</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-5 aspect-square">
          <File className="w-5 aspect-square" />
        </div>
        <span className="text-base">Document</span>
      </div>
      <PollCreationBox />
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-5 aspect-square">
          <PersonIcon className="w-5 aspect-square" />
        </div>
        <span className="text-base">Attach</span>
      </div>
    </motion.div>
  )
}

export default InputSelectionBox
