"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import React, { FC, useState } from "react"

interface SettingTopBarProps {
  handleCloseButtonClick(): void
}
const SettingTopBar: FC<SettingTopBarProps> = ({ handleCloseButtonClick }) => {
  return (
    <div className="flex justify-between ">
      <div className=" flex flex-col">
        <span className="font-bold text-text text-2xl">Settings</span>
        <span>Change your app setting.</span>
      </div>
      <Button className="relative w-10 bg-[#383a42]" rounded onClick={handleCloseButtonClick} size={"icon"}>
        <X className="w-5 aspect-square" />
      </Button>
    </div>
  )
}

export default SettingTopBar
