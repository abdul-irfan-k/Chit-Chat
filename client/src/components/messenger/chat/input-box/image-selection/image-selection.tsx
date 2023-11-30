import { axiosUploadInstance } from "@/constants/axios"
import { PersonIcon, XMarkIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import Image from "next/image"
import React, { FC, useEffect, useRef, useState } from "react"
import {Socket} from "socket.io-client"

interface ImageSelectionProps {
  userDetail: userDetailState["userDetail"]
  currentChaterDetail: chatUsersListReducerState["currentChaterDetail"]
}
const ImageSelection: FC<ImageSelectionProps> = ({ userDetail, currentChaterDetail }) => {
  const { socket } = useSocketIoContext()
  const [fileImageUrl, setFileImageUrl] = useState<Array<string>>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<Array<File>>([])

  useEffect(() => {
    selectedFile.forEach((file) => {
      const url = URL.createObjectURL(file)
      setFileImageUrl([...fileImageUrl, url])
    })
  }, [selectedFile])

  const handlerGalleryButtonClick = () => {
    if (inputRef == null || inputRef.current == null) return
    inputRef.current.click()
  }

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesCollection = event.target.files && event.target.files
    if (!filesCollection) return

    Array.from(filesCollection).forEach((file) => {
      setSelectedFile([...selectedFile, file])
    })
  }

  const fileUploadHandler = async () => {
    try {
      if (currentChaterDetail == null || userDetail == null) return
      const formData = new FormData()
      formData.append("file", selectedFile[0])

      const { data: response } = await axiosUploadInstance.post("/uploadSingleImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (response.isUploadedImage == undefined) return
      if (currentChaterDetail.currentChaterType == "user" && currentChaterDetail.chatRoom != undefined) {
        socket.emit("message:newImageMessage", {
          chatRoomId: currentChaterDetail.chatRoom.chatRoomId,
          message: { imageMessageSrc: response.fileUrl },
          receiverId: currentChaterDetail._id,
          senderId: userDetail._id,
        })
      }
    } catch (error) {}
  }


  const sendFileHandler = () => {
  }
  const cancelButtonHandler = () => {
    setSelectedFile([])
    setFileImageUrl([])
  }

  return (
    <>
      <div className="gap-1 py-2 flex items-center" onClick={handlerGalleryButtonClick}>
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Gallery</span>
      </div>
      <div className="absolute">
        <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleInputFileChange} />
      </div>

      {selectedFile.length > 0 && (
        <div className="fixed top-0 left-0 w-screen h-screen ">
          <div className="px-4 py-1 w-[40%] absolute top-[30%] left-[50%] translate-x-[-50%] dark:bg-neutral-900">
            <div className="gap-1 flex items-center">
              <div className="relative w-6 aspect-square" onClick={cancelButtonHandler}>
                <XMarkIcon className="w-6 aspect-square" width="" height="" />
              </div>
              <span className="text-lg">send {selectedFile.length} Photos</span>
            </div>
            {fileImageUrl.map((url, index) => {
              return (
                <div className="mt-5 relative w-full aspect-video" key={index}>
                  <Image src={url} alt="image" fill />
                </div>
              )
            })}
            <div
              className="mt-5 px-4 py-2 rounded-full bg-blue-500 flex items-center justify-center"
              onClick={fileUploadHandler}
            >
              send
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageSelection
