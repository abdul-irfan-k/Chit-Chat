import { axiosUploadInstance } from "@/constants/axios"
import { FolderIcon, PersonIcon, XMarkIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import Image from "next/image"
import React, { FC, useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"

interface ImageSelectionProps {
  userDetail: userDetailState["userDetail"]
  currentChaterDetail: chatUsersListReducerState["currentChaterDetail"]
}
const ImageSelection: FC<ImageSelectionProps> = ({ userDetail, currentChaterDetail }) => {
  const { socket } = useSocketIoContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<Array<File>>([])

  const [fileImageUrl, setFileImageUrl] = useState<Array<string>>([])
  const [videoUrl, setVideoUrl] = useState<Array<string>>([])
  const [] = useState<Array<{ name: string; type: string }>>([])

  useEffect(() => {
    selectedFile.forEach((file) => {
      const mimeType = file.type.split("/")
      const type = mimeType[0]

      const url = URL.createObjectURL(file)
      if (type == "image") setFileImageUrl([...fileImageUrl, url])
      if (type == "video") setVideoUrl([...videoUrl, url])
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

      // image upllading and sending in socker io
      const selectedImages = selectedFile.filter((file) => file.type.split("/")[0] == "image")
      if (selectedImages.length > 0) {
        const isUploadSingleImage = selectedImages.length == 1

        const formData = new FormData()

        selectedImages.forEach((imageFile) => {
          formData.append("image", imageFile)
        })

        const axiosUploadPath = isUploadSingleImage ? "/uploadSingleImage" : "/uploadMultipleImage"
        const { data: response } = await axiosUploadInstance.post(axiosUploadPath, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        if (
          response.isUploaded != undefined &&
          currentChaterDetail.currentChaterType == "user" &&
          currentChaterDetail.chatRoom != undefined
        ) {
          socket.emit("message:newImageMessage", {
            chatRoomId: currentChaterDetail.chatRoom.chatRoomId,
            message: { imageMessageSrc: response.fileUrl },
            receiverId: currentChaterDetail._id,
            senderId: userDetail._id,
          })
        }
      }

      // video uploading and sending
      const selectedVideoFiles = selectedFile.filter((file) => file.type.split("/")[0] == "video")  
      if (selectedVideoFiles.length > 0) {
        const formData = new FormData()
        formData.append("video", selectedVideoFiles[0])

        const axiosUploadPath = "uploadVideo"
        const { data: response } = await axiosUploadInstance.post(axiosUploadPath, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        if (
          response.isUploaded != undefined &&
          currentChaterDetail.currentChaterType == "user" &&
          currentChaterDetail.chatRoom != undefined
        ) {
          socket.emit("message:newVideoMessage", {
            chatRoomId: currentChaterDetail.chatRoom.chatRoomId,
            message: { videoMessageSrc: response.fileUrl },
            receiverId: currentChaterDetail._id,
            senderId: userDetail._id,
          })
        }
      }
    } catch (error) {}
  }

  const sendFileHandler = () => {}
  const cancelButtonHandler = () => {
    setSelectedFile([])
    setFileImageUrl([])
  }

  return (
    <>
      <div className="gap-1 py-2 flex items-center" onClick={handlerGalleryButtonClick}>
        <div className="relative w-6 aspect-square">
          <FolderIcon className="w-6 aspect-square" width="" height="" />
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

            {videoUrl.map((url, index) => {
              return (
                <div className="mt-5 relative w-full aspect-video" key={index}>
                  <video className="videoPlayer w-full h-full" controls width="70%" src={url}></video>
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
