import { XMarkIcon } from "@/constants/icon-constant"
import Image from "next/image"
import React, { FC, useEffect, useState } from "react"

interface PreviewSelectedImageProps {
  files: File[]
  sendButtonHandler?(): void
  cancelButtonHandler?(): void
}
const PreviewSelectedImage: FC<PreviewSelectedImageProps> = ({ files, sendButtonHandler, cancelButtonHandler }) => {
  const [fileImageUrl, setFileImageUrl] = useState<Array<string>>([])
  useEffect(() => {
    files.forEach((file) => {
      const url = URL.createObjectURL(file)
      setFileImageUrl([...fileImageUrl, url])
    })
  }, [files])
  return (
    <div className="fixed top-0 left-0 w-screen h-screen ">
      <div className="px-2 py-1 absolute top-[50%] left-[50%] translate-x-[-50%] dark:bg-neutral-900">
        <div className="gap-1 flex items-center">
          <div className="relative w-6 aspect-square" onClick={cancelButtonHandler}>
            <XMarkIcon className="w-6 aspect-square" width="" height="" />
          </div>
          <span className="text-lg">send {files.length} Photos</span>
        </div>
        {fileImageUrl.map((url, index) => {
          return (
            <div className="relative w-full aspect-video" key={index}>
              <Image src={url} alt="image" fill />
            </div>
          )
        })}
        <div className="px-4 py-2 rounded-full bg-blue-500 flex items-center justify-center" onClick={sendButtonHandler}>send</div>
      </div>
    </div>
  )
}

export default PreviewSelectedImage
