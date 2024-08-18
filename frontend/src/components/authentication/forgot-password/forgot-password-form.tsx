"use client"
import React, { useState } from "react"
import SocialMediaLoginContainer from "../social-media-login/social-media-login-container"
import { forgotPasswordRequestHandler } from "@/redux/actions/user-action/user-action"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

const ForgotPasswordForm = () => {
  const [userDetail, setUserDetail] = useState({ email: "" })
  const [loading, setLoading] = useState(false)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  const handleResetButtonClick = async () => {
    setLoading(true)
    await forgotPasswordRequestHandler({ ...userDetail })
    setLoading(false)
  }
  return (
    <div>
      <div className="mt-10   flex-1 flex flex-col  text-neutral-800 dark:text-slate-200">
        <span className="text-lg font-medium">Email Address</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="email"
            placeholder="Enter Email"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="email"
            onChange={inputChangeHandler}
          />
        </div>

        <div className="mt-10 gap-5 px-2 flex justify-between ">
          <Button className="w-full text-lg" onClick={handleResetButtonClick}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
