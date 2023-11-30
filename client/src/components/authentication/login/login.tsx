import React, { useState } from "react"
import SocialMediaLoginContainer from "../social-media-login/social-media-login-container"
import Image from "next/image"
import { useAppDispatch } from "@/store"

const Login = () => {
  const dispatch = useAppDispatch()
  const [userDetail, setUserDetail] = useState({ email: "", password: "" })

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex  rounded-3xl xl:w-[70vw]">
        <div className="px-6 py-3  flex flex-col xl:w-[30%]" style={{ backgroundColor: "rgba(38, 43, 72, 0.92)" }}>
          <div className="mt-5 flex ">
            <div className="relative w-[15%] aspect-square">
              <Image alt="logo" src={"/Asset/logo.png"} fill />
            </div>
            <div className="ml-3  font-bold text-4xl">ChitChat</div>
          </div>

          <SocialMediaLoginContainer />
        </div>

        <div className=" gap-6 px-6 py-6 flex-1 flex flex-col bg-slate-200 dark:bg-neutral-950 ">
          <h1 className="text-xl font-semibold">Sign Up</h1>

          <div className="flex gap-3">
            <div className="flex-1 border-b-[3px] border-neutral-800">
              <input
                type="text"
                placeholder="Enter First Name"
                className="px-4 py-2 border-none rounded-md  w-full text-base   dark:bg-neutral-950  dark:text-slate-50"
                name="firstname"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex-1 border-b-[3px] border-neutral-800">
              <input
                type="text"
                placeholder="Enter Last Name"
                className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
                name="lastName"
                onChange={inputChangeHandler}
              />
            </div>
          </div>

          <div className="border-b-[3px] border-neutral-800">
            <input
              type="text"
              placeholder="Enter user id"
              className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
              name="userId"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="border-b-[3px] border-neutral-800">
            <input
              type="text"
              placeholder="Enter Email"
              className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
              name="email"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="border-b-[3px] border-neutral-800">
            <input
              type="text"
              placeholder="Enter Password"
              className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
              name="password"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="border-b-[3px] border-neutral-800">
            <input
              type="password"
              placeholder="Enter Comfirm Password"
              className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
              name="firstname"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="border-b-[3px] border-neutral-800">
            <input
              type="password"
              placeholder="Enter user id"
              className="px-4 py-2 border-none rounded-md  w-full text-base  dark:bg-neutral-950 dark:text-slate-50"
              name="confirmPassword"
              onChange={inputChangeHandler}
            />
          </div>

          <div
            className="mt-3 py-2 text-xl font-extrabold flex items-center justify-center rounded-full bg-blue-500 "
            onClick={signUpButtonHandler}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
