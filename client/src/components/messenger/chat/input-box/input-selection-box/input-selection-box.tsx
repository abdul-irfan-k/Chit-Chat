import { PersonIcon } from "@/constants/icon-constant"
import React, { useRef, useState } from "react"
import PreviewSelectedImage from "../preview-selected-image/preview-selected-image"
import { axiosUploadInstance } from "@/constants/axios"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"

const InputSelectionBox = () => {
  const {socket} = useSocketIoContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<Array<File>>([])

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesCollection = event.target.files && event.target.files
    if (!filesCollection) return

    Array.from(filesCollection).forEach((file) => {
      setSelectedFile([...selectedFile, file])
    })
  }

  const handlerGalleryButtonClick = () => {
    if (inputRef == null || inputRef.current == null) return
    inputRef.current.click()
  }

  const fileUploadHandler = async () => {
    try {
      const formData = new FormData()
      formData.append("file", selectedFile[0])

      const { data: response } = axiosUploadInstance.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if(response.isUploadedImage) {
        socket.emit("")
      }
    } catch (error) {}
  }

  const cancelButtonHandler = () => {
    setSelectedFile([])
  }
  return (
    <div className="absolute px-8 py-5 rounded-lg gap-1 flex flex-col bottom-[200%] bg-slate-300  dark:bg-slate-900">
      <div className="gap-1 py-2 flex items-center" onClick={handlerGalleryButtonClick}>
        <div className="relative w-6 aspect-square">
          <PersonIcon className="w-6 aspect-square" width="" height="" />
        </div>
        <span className="text-base">Gallery</span>
      </div>
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
      <div className="absolute">
        <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleInputFileChange} />
      </div>
      {selectedFile.length > 0 && (
        <PreviewSelectedImage
          files={selectedFile}
          cancelButtonHandler={cancelButtonHandler}
          sendButtonHandler={fileUploadHandler}
        />
      )}
    </div>
  )
}

export default InputSelectionBox
