import { PersonIcon } from "@/constants/icon-constant"
import React, { useRef, useState } from "react"
import PreviewSelectedImage from "../image-selection/image-selection"
import { axiosUploadInstance } from "@/constants/axios"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { useSelector } from "react-redux"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import ImageSelection from "../image-selection/image-selection"

const InputSelectionBox = () => {
  
 
  

  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)




  return (
    <div className="absolute px-8 py-5 rounded-lg gap-1 flex flex-col bottom-[200%] bg-slate-300  dark:bg-slate-900">
    
      <ImageSelection currentChaterDetail={currentChaterDetail} userDetail={userDetail} />
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Camara</span>
      </div>
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Contact</span>
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
      <div className="gap-1 py-2 flex items-center">
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Poll</span>
      </div>
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
