"use client"
import { useAppDispatch } from "@/store"
import { signUpHandler } from "@/redux/actions/user-action/user-action"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SignUpForm = () => {
  const dispatch = useAppDispatch()

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value })

  const signUpButtonHandler = async () => {
    setLoading(true)
    await dispatch(signUpHandler({ ...userDetail }))
    setLoading(false)
  }
  return (
    <div>
      <div className="mt-10   flex-1 flex flex-col  text-neutral-800 dark:text-slate-200">
        <span className="text-lg font-medium">Name</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Name"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="name"
            onChange={inputChangeHandler}
          />
        </div>
        <span className="mt-5 text-lg font-medium">Email Address</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Email"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <span className="mt-5 text-lg font-medium">User Id</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Email"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <span className="mt-5 text-lg font-medium">Password</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Password"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="password"
            onChange={inputChangeHandler}
          />
        </div>
        <span className="mt-5 text-lg font-medium">Comfri Password</span>
        <div className="border-[1px] border-neutral-500 rounded-md">
          <input
            type="text"
            placeholder="Enter Password"
            className="px-4 py-2 border-none outline-none rounded-md  w-full text-base  bg-transparent "
            name="password"
            onChange={inputChangeHandler}
          />
        </div>

        <div className="gap-5 mt-10 px-2 flex justify-between ">
          <Button className="w-full text-lg" onClick={signUpButtonHandler}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
          <Button variant={"secondary"} className="w-full text-lg" asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
