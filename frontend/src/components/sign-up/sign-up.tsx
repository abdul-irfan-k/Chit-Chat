"use client"

import { signUpHandler } from "@/redux/actions/user-action/user-action"
import { userSignUpDeatil } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [userDetail, setUserDetail] = useState({ name: "", email: "", userId: "", password: "", confirmPassword: "" })
  const {  isContainSignUpError,errorMessage:signUpErrorMessage } = useSelector(
    (state: { userSignUpDetail: userSignUpDeatil }) => state.userSignUpDetail,
  )

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  const signUpButtonHandler = () => {
    dispatch(signUpHandler(userDetail))
  }

  return (
    <div className="flex flex-col w-[100%] p-10  sm:p-20  md:w-[50%] md:p-10 lg:w-[40%]">
      <div className="flex items-center gap-5">
        <div></div>
        <div className="font-bold text-xl text-slate-950 dark:text-slate-50 md:text-2xl xl:text-4xl">
          CHITCHAT REGISTER
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">Name</div>
        <input
          type="text"
          className="px-3 py-1 border-none  text-base  dark:bg-slate-100 dark:text-slate-950"
          name="name"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">User Id</div>
        <input
          type="text"
          className="px-3 py-1 border-none  text-base  dark:bg-slate-100 dark:text-slate-950"
          name="userId"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">Email</div>
        <input
          type="text"
          className="px-3 py-1 border-none  text-base  dark:bg-slate-100 dark:text-slate-950"
          name="email"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">Passwords</div>
        <input
          type="text"
          className="px-3 py-1 border-none  text-base  dark:bg-slate-100 dark:text-slate-950"
          name="password"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className="font-medium text-slate-900 text-sm dark:text-slate-100 md:text-xs ">Comfirm Passwords</div>
        <input
          type="text"
          className="px-3 py-1 border-none  text-base  dark:bg-slate-100 dark:text-slate-950"
          name="confirmPassword"
          onChange={inputChangeHandler}
        />
      </div>
      {isContainSignUpError && <div className="mt-5 font-semibold text-red-600">{signUpErrorMessage}</div>}

      <div className="mt-10 gap-10 text-lg flex items-center justify-center">
        <div
          className="px-6 py-3 rounded-md bg-blue-500 text-slate-950   dark:text-slate-50"
          onClick={signUpButtonHandler}
        >
          Signup
        </div>
        <div className="px-6 py-3 rounded-md  bg-stone-900 text-slate-50    dark:text-slate-50">Login</div>
      </div>

      <div className="mt-5 text-center text-slate-950 dark:text-slate-50">Or connect with</div>
      <div className="mt-5 gap-5 flex items-center justify-center">
        <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">d</div>
        <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">d</div>
        <div className="w-10 flex items-center justify-center bg-red-500 aspect-square rounded-full ">d</div>
      </div>

      <div className="mt-5 text-center">term and policy</div>
    </div>
  )
}

export default SignUp
