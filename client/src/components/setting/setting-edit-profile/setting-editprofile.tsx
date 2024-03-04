"use client"
import { axiosUserInstance } from "@/constants/axios"
import { AddIcon, ArrowBackIcon, CallIcon, CorrectIcon } from "@/constants/icon-constant"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import Image from "next/image"
import React, { FC, useRef, useState } from "react"
import { useSelector } from "react-redux"

interface SettingEditProfileProps {
  userDetail?: userDetailState["userDetail"]
  backButtonHandler(): void
}
const SettingEditProfile: FC<SettingEditProfileProps> = ({ backButtonHandler, userDetail }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [updatedUserDetail, setUpdatedUserDetail] = useState({
    firstName: userDetail != null && userDetail.name.split(" ")[0] != undefined ? userDetail.name : "",
    lastName: userDetail != null && userDetail.name.split(" ")[1] != undefined ? userDetail.name.split(" ")[1] : "",
  })
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined)
  const [selectedimageUrl, setSelectedImageUrl] = useState<string | undefined>(undefined)

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesCollection = event.target.files && event.target.files
    if (!filesCollection) return
    setSelectedImage(event.target.files[0])
    const url = URL.createObjectURL(event.target.files[0])
    setSelectedImageUrl(url)
  }

  const addImageButtonHandler = () => {
    if (inputRef == null || inputRef.current == null) return
    inputRef.current.click()
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUpdatedUserDetail({ ...updatedUserDetail, [e.target.name]: e.target.value })
  const submitButtonHandler = async () => {
    try {
      if (selectedImage == undefined) return
      const formData = new FormData()
      formData.append("profileImage", selectedImage)

      const fullName = updatedUserDetail.firstName + " " + updatedUserDetail.lastName
      console.log("full name", fullName)
      formData.append("name", fullName)

      const { data } = await axiosUserInstance.post("/updateUserDetail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="overflow-y-scroll h-screen no-scrollbar ">
      <div className="fixed gap-3 py-2 flex items-center bg-neutral-950 z-[20] w-full">
        <div className="w-6 aspect-square" onClick={backButtonHandler}>
          <ArrowBackIcon className="w-6 aspect-square" />
        </div>
        <span className="font-semibold text-xl">Edit Profile</span>
      </div>

      <div className="flex flex-col pt-5">
        <div className="relative  flex items-center justify-center py-10">
          <div className="relative w-[33%] aspect-square rounded-full overflow-hidden" onClick={addImageButtonHandler}>
            {userDetail != null && userDetail.profileImageUrl != undefined && selectedimageUrl == undefined && (
              <Image src={userDetail.profileImageUrl} alt="profile image" fill />
            )}
            {selectedimageUrl != undefined && <Image src={selectedimageUrl} alt="profile image" fill />}
            {userDetail == null ||
              (userDetail.profileImageUrl == undefined && <div className="w-full h-full block bg-red-300"></div>)}
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <div className="relative ">
                <AddIcon width="" height="" className="w-10 aspect-square" />
              </div>
            </div>

            <div className="absolute">
              <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleInputFileChange} />
            </div>
          </div>
        </div>

        <div className="gap-10 flex flex-col text-sm">
          <div className="relative flex-1 px-2 border-[0.5px] border-neutral-300 rounded-md">
            <label className="absolute px-1 top-0 translate-y-[-50%] bg-slate-200 dark:bg-neutral-950  ">
              <span>First Name</span>
            </label>
            <input
              type="text"
              className="bg-transparent text-lg py-4  outline-none  w-full text-slate-50   hover:border-none"
              placeholder="Enter First Name"
              defaultValue={updatedUserDetail.firstName}
              onChange={inputChangeHandler}
              name="firstName"
            />
          </div>
          <div className="relative flex-1 px-2 border-[0.5px] border-neutral-300 rounded-md">
            <label className="absolute px-1  top-0 translate-y-[-50%] bg-slate-200 dark:bg-neutral-950  ">
              <span>Last Name</span>
            </label>
            <input
              type="text"
              className="bg-transparent text-lg py-4  outline-none  w-full text-slate-50   hover:border-none"
              placeholder="Enter Last Name"
              defaultValue={updatedUserDetail.lastName}
              name="lastName"
              onChange={inputChangeHandler}
            />
          </div>
        </div>

        <div
          className="fixed w-14 aspect-square bg-blue-500 flex items-center justify-center rounded-full bottom-10 right-0"
          onClick={submitButtonHandler}
        >
          <CorrectIcon className="w-8 aspect-square" width="" height="" />
        </div>
      </div>
    </div>
  )
}

export default SettingEditProfile
