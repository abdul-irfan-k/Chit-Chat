"use client"
import React from "react"
import { useDropzone } from "react-dropzone"

interface DropZoneProps {}
const DropZone = () => {
  const onDrop = (acceptedFiles) => {
  }


      const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: '*', onDrop })

  return <div>DropZone</div>
}

export default DropZone
