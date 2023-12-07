"use client"
import { DescriptionIcon } from "@/constants/icon-constant"
import React, { FC } from "react"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

interface DropZoneProps {
  onDropHandler:
    | (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void)
    | undefined
}
const DropZone: FC<DropZoneProps> = ({ onDropHandler }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "*": "image/*",
    },
    onDrop: onDropHandler,
    onDragEnter: (e) => {
      console.log("er", e)
    },
  })

  return (
    <div className="px-24 top-[20%] absolute   w-full h-[70vh]">
      <div className="px-5 py-5 bg-neutral-900 h-full rounded-md">
        <div className="h-full border-dashed border-2">
          <div className=" top-0  h-full  z-[120] block">
            <div {...getRootProps()} className="w-full h-full relative ">
              <input
                className="block w-full h-full   border-none bg-red-500"
                {...getInputProps()}
                style={{ display: "block", opacity: "0" }}
              />

              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {!isDragActive ? (
                  <div className="gap-2 flex flex-col items-center ">
                    <div className="relative w-28 aspect-square ">
                      <DescriptionIcon className="w-28 aspect-square " width="" height="" />
                    </div>
                    <span className="text-2xl font-medium">Drops files here to send them</span>
                  </div>
                ) : (
                  <p>not draged</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropZone
