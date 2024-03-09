"use client"
import React, { useState } from "react"
import GettingStarted from "./getting-started/getting-started"
import WelcomeThemeSelector from "./welcome-theme-selector/welcome-theme-selector"
import Finish from "./finish/finish"
import { useRouter } from "next/navigation"
import { userIntialSettingSetupHandler } from "@/redux/actions/user-action/user-action"

const WelcomePageContainer = () => {
  const router = useRouter()

  const [welcomeStep, setWelcomeStep] = useState<
    "gettingStarted" | "themeSelector" | "settingManager" | "finish" | undefined
  >("gettingStarted")

  const [completedStepCount, setCompletedStepCount] = useState<number>(0)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  const updateUserSettingHandler = () => {
    userIntialSettingSetupHandler({ theme }, router)
  }

  return (
    <div>
      {welcomeStep == "gettingStarted" && (
        <GettingStarted
          continueButtonHandler={() => {
            setWelcomeStep("themeSelector")
            setCompletedStepCount(1)
          }}
        />
      )}
      {welcomeStep == "themeSelector" && (
        <WelcomeThemeSelector
          setTheme={setTheme}
          theme={theme}
          continueButtonHandler={() => {
            setWelcomeStep(undefined)
            setCompletedStepCount(2)

            updateUserSettingHandler()
          }}
        />
      )}

      {/* {welcomeStep == "finish" && (
        <Finish
          continueButtonHandler={() => {
            setWelcomeStep(undefined)
            setCompletedStepCount(3)
          }}
        />
      )} */}
      <div className="fixed top-[95%] left-[50%]  " style={{ transform: "translateX(-50%)" }}>
        <div className="gap-3  relative flex h-full justify-between">
          {Array.from({ length: 3 }).map((elm, index) => {
            const isCompleted: Boolean = completedStepCount >= index + 1
            return (
              <div
                key={index}
                className={
                  "relative w-3 aspect-square block rounded-full  " +
                  (isCompleted ? " bg-neutral-600" : "bg-neutral-800")
                }
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WelcomePageContainer
