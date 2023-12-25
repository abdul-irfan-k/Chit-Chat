"use client"
import React, { useState } from "react"
import GettingStarted from "./getting-started/getting-started"
import WelcomeThemeSelector from "./welcome-theme-selector/welcome-theme-selector"

const WelcomePageContainer = () => {
  const [welcomeStep, setWelcomeStep] = useState<"gettingStarted" | "themeSelector" | "settingManager" | undefined>(
    "gettingStarted",
  )

  const [completedStepCount, setCompletedStepCount] = useState<number>(0)
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
          continueButtonHandler={() => {
            setWelcomeStep("settingManager")
            setCompletedStepCount(2)
          }}
        />
      )}

      <div className="fixed top-[95%] left-[50%]  w-[10vw] " style={{ transform: "translateX(-50%)" }}>
        <div className="relative flex h-full justify-between">
          {Array.from({ length: 5 }).map((elm, index) => {
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
