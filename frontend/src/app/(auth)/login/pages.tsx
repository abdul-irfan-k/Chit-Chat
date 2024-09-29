import BannerAnimation from "@/components/authentication/banner-animation"
import { Dot } from "lucide-react"
import Image from "next/image"

const LoginPage = () => {
  return (
    <div>
      <div className="w-full h-screen flex  ">
        <div className="px-6 py-3 w-full flex flex-col h-screen bg-background text-black  rounded-3xl   md:w-[50%] xl:w-[40vw]  dark:bg-[#121212]">
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
          {/* <Login /> */}

          <div className="mt-20 gap-2  flex justify-center dark:text-slate-300 ">
            <span className="flex items-center">
              <Dot />
              Terms and Condition
            </span>
            <span>& Privary and Policy</span>
          </div>
        </div>
        <BannerAnimation />
      </div>
    </div>
  )
}

export default LoginPage
