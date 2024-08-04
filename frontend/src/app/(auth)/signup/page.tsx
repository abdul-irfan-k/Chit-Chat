import SignUpForm from "@/components/authentication/sign-up/sign-up"
import { Dot } from "lucide-react"
import Image from "next/image"

const SignUpPage = () => {
  return (
    <div>
      <div className="w-full h-screen flex  ">
        <div className="px-6 py-3 flex flex-col h-screen bg-background text-black  rounded-3xl  xl:w-[40vw] dark:bg-[#121212]">
          <div className="mt-5 flex ">
            <div className="relative w-[10%] aspect-square ">
              <Image alt="logo" src={"/Asset/logo.png"} fill />
            </div>
            <div className="ml-3  font-medium text-4xl uppercase dark:text-slate-50">
              <span className="font-bold">Chit</span>
              Chat
            </div>
          </div>
          <div className="mt-10 flex flex-col">
            <span className="text-2xl font-semibold dark:text-slate-50">Hello Everyone We Are ChitChat</span>
            <span className="text-neutral-600 text-sm dark:text-slate-300">
              Welcome to chitchat please login to your account
            </span>
          </div>
          <SignUpForm />

          <div className="mt-20 gap-2  flex justify-center dark:text-slate-300 ">
            <span className="flex items-center">
              <Dot />
              Terms and Condition
            </span>
            <span>& Privary and Policy</span>
          </div>
        </div>
        <div className="relative w-full h-screen flex bg-[#eff7fe] dark:bg-[#1d2328] ">
          <div className="relative mx-auto mt-auto  w-[70%] aspect-square bg-transparent">
            <Image alt="logo" src={"/Asset/banner.png"} fill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
