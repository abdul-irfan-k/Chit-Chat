import React, { FC } from "react"

interface FinishProps {
  continueButtonHandler(): void
}
const Finish: FC<FinishProps> = ({ continueButtonHandler }) => {
  return (
    <div
      className="fixed top-[50%] left-[50%] w-[65vw] flex flex-col text-center text-slate-50"
      style={{ transform: "translate(-50%,-50%)" }}
    >
      <div
        className="mt-10 mx-auto self-start py-4 px-32 rounded-md text-lg bg-blue-500 "
        onClick={continueButtonHandler}
      >
        Finish
      </div>
    </div>
  )
}

export default Finish
