"use client"
import GroupCreationForm from "@/components/messenger/form/group-creation-form/group-creation-form"
import { useRouter } from "next/navigation"
import React from "react"

const CreateGroupPage = () => {
  const router = useRouter()
  return (
    <div className="w-full">
      <GroupCreationForm handleOutsideClick={() => {}} handleCloseButtonClick={() => router.push("/messenger")} />
    </div>
  )
}

export default CreateGroupPage
