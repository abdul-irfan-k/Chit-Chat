"use client"
import React, { FC } from "react"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

interface DropZoneProps {
  onDropHandler:
    | (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void)
    | undefined
}
const DropZone: FC<DropZoneProps> = ({ onDropHandler }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: "*", onDrop: onDropHandler })

  return (
    <div className="top-[20%] absolute  w-full h-[70vh]  border-2">
      <div className=" top-0  h-full  z-[120] block">
        <div {...getRootProps()} className="w-full h-full ">
          <input {...getInputProps()} className="block w-full h-full   border-none bg-red-500" />
          {isDragActive ? <p>drag is active </p> : <p>not draged</p>}
        </div>
      </div>
    </div>
  )
}

export default DropZone
