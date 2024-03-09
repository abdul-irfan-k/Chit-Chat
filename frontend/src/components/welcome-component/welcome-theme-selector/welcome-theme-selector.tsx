"use client"
import Image from "next/image"
import React, { FC, useState } from "react"

interface WelcomeThemeSelectorProps {
  continueButtonHandler(): void
  theme: "light" | "dark" | "system"
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | "system">>
}
const WelcomeThemeSelector: FC<WelcomeThemeSelectorProps> = ({ continueButtonHandler, setTheme, theme }) => {
  return (
    <div
      className="fixed top-[50%] left-[50%] w-[65vw] flex flex-col text-center text-slate-50  "
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <span className="text-3xl font-semibold">Choose your style</span>
      <span className="mt-5 text-lg">You can change the UI style in setting in any time </span>
      <div className="mt-5 flex rounded-md ">
        <div
          className={
            " relative   px-8 py-8  flex flex-col justify-center items-center w-full aspect-video  border-r-[1px] border-neutral-700   " +
            (theme == "light" ? " dark:bg-neutral-800 " : " dark:bg-neutral-950")
          }
          onClick={() => setTheme("light")}
        >
          <div className="relative w-full h-full flex justify-center">
            <div className="relative h-full aspect-video">
              <Image src="/Asset/theme/light-theme.svg" alt="image" fill />
            </div>
          </div>
          <span className="mt-4">Light</span>
        </div>
        <div
          className={
            " relative   px-8 py-8  flex flex-col justify-center items-center w-full aspect-video  border-r-[1px] border-neutral-700   " +
            (theme == "dark" ? " dark:bg-neutral-800 " : " dark:bg-neutral-950")
          }
          onClick={() => setTheme("dark")}
        >
          <div className="relative w-full h-full flex justify-center">
            <div className="relative h-full aspect-video">
              <Image src="/Asset/theme/dark-theme.svg" alt="image" fill />
            </div>
          </div>
          <span className="mt-4">Dark</span>
        </div>
        <div
          className={
            " relative   px-8 py-8  flex flex-col justify-center items-center w-full aspect-video  border-r-[1px] border-neutral-700   " +
            (theme == "system" ? " dark:bg-neutral-800 " : " dark:bg-neutral-950")
          }
          onClick={() => setTheme("system")}
        >
          <div className="relative w-full h-full flex justify-center">
            <div className="relative h-full aspect-video">
              <Image src="/Asset/theme/system-theme.svg" alt="image" fill />
            </div>
          </div>
          <span className="mt-4">System (Default)</span>
        </div>
      </div>

      <div
        className="mt-10 mx-auto self-start py-4 px-32 rounded-md text-lg bg-blue-500 "
        onClick={continueButtonHandler}
      >
        Continue
      </div>
    </div>
  )
}

export default WelcomeThemeSelector
