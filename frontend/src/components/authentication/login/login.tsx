"use client"
import React, { useState } from "react"
import SocialMediaLoginContainer from "../social-media-login/social-media-login-container"
import Image from "next/image"
import { useAppDispatch } from "@/store"
import { loginHandler } from "@/redux/actions/user-action/user-action"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

const Login = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [userDetail, setUserDetail] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  const loginButtonHandler = async () => {
    setLoading(true)
    await dispatch(loginHandler({ ...userDetail }, router))
    setLoading(false)
  }
  return (
    <div>
      <div className="mt-10   flex-1 flex flex-col  text-neutral-800 dark:text-slate-200">
        <span className="text-lg font-medium">Email Address</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Email"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <span className="mt-10 text-lg font-medium">Password</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Password"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="password"
            onChange={inputChangeHandler}
          />
        </div>

        <div className="mt-10 flex justify-between text-sm dark:text-slate-300">
          <span className="gap-1 flex items-center ">
            <Checkbox />
            Remember me
          </span>
          <span>Forgot Password</span>
        </div>
        <div className="gap-5 mt-5 px-2 flex justify-between ">
          <Button className="w-full text-lg" onClick={loginButtonHandler}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          <Button variant={"secondary"} className="w-full text-lg" asChild>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col justify-center items-center dark:text-slate-300">
          <span>Or Connect With</span>
          <SocialMediaLoginContainer />
        </div>
      </div>
    </div>
  )
}

export default Login
