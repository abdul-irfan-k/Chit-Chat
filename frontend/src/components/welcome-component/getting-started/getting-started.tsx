import React, { FC } from "react"

interface GettingStartedProps {
  continueButtonHandler(): void
}
const GettingStarted: FC<GettingStartedProps> = ({ continueButtonHandler }) => {
  return (
    <div
      className="fixed top-[50%] left-[50%] w-[65vw] flex flex-col text-center text-slate-50"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <div className="mx-auto relative w-[10%] aspect-square block rounded-full overflow-hidden bg-red-200"></div>
      <span className="mt-5 text-3xl font-semibold">Welcome to Chitchat</span>
      <span className="mt-5 text-lg">You can change the UI style in setting in any time </span>
      <div
        className="mt-10 mx-auto self-start py-4 px-32 rounded-md text-lg bg-blue-500 "
        onClick={continueButtonHandler}
      >
        Getting Started
      </div>
    </div>
  )
}

export default GettingStarted
