"use client"
import { ChatIcon, GroupIcon, PersonAddIcon, PlusIcon } from "@/constants/icon-constant"
import React, { useState } from "react"
import SearchBar from "../search-bar/search-bar"
import GroupCreationForm from "../form/group-creation-form/group-creation-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const AddButton = () => {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
  const [popUpForm, setPopUpForm] = useState<"newChat" | "newGroup" | "newContact" | undefined>(undefined)

  const addButtonClickHandler = () => setIsButtonClicked(!isButtonClicked)
  const popUpFromSelectHandler = (selectedFrom: "newChat" | "newGroup" | "newContact" | undefined) => {
    if (popUpForm == selectedFrom) return setPopUpForm(undefined)
    else setPopUpForm(selectedFrom)
  }

  return (
    <div>
      <div
        className="absolute bottom-5 rounded-full right-4 w-10 aspect-square bg-blue-500 fill-slate-50 flex items-center justify-center"
        onClick={addButtonClickHandler}
      >
        <Button className="relative w-full h-full" rounded size={"icon"}>
          <Plus className="aspect-square w-6" />
        </Button>

        {isButtonClicked && (
          <div className="absolute gap-3 px-2 py-2 right-0 translate-y-[-70%] w-36 z-30 flex flex-col  bg-neutral-950 text-sm">
            <div
              className="relative flex items-center justify-between"
              onClick={() => popUpFromSelectHandler("newChat")}
            >
              <span>New Chat</span>
              <div
                className="relative w-10 flex justify-center items-center aspect-square rounded-full"
                style={{ background: "rgba(28,157,234,.15)" }}
              >
                <ChatIcon className="w-6 aspect-square" width="" height="" />
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <span>New Group</span>
              <div
                className="relative w-10 flex justify-center items-center aspect-square rounded-full"
                style={{ background: "rgba(28,157,234,.15)" }}
                onClick={() => popUpFromSelectHandler("newGroup")}
              >
                <GroupIcon className="w-6 aspect-square" width="" height="" />
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <span>New Contact</span>
              <div
                className="relative w-10 flex justify-center items-center aspect-square rounded-full"
                style={{ background: "rgba(28,157,234,.15)" }}
                onClick={() => popUpFromSelectHandler("newContact")}
              >
                <PersonAddIcon className="w-6 aspect-square" width="" height="" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <SearchBar /> */}
      {popUpForm == "newGroup" && <GroupCreationForm handleOutsideClick={() => setPopUpForm(undefined)} />}
    </div>
  )
}

export default AddButton
