import React, { FC } from "react"

const KeyboardAndTimeSetting = () => {
  return (
    <>
      <div className="mt-5">
        <span className="font-semibold text-lg">Keyboard </span>
        <div className="mt-2 gap-2 flex flex-col ">
          <KeyboardAndTimeSettingRow title="Send by Enter" />
          <KeyboardAndTimeSettingRow title="Send by Ctrl + Enter" />
        </div>
      </div>
      <div className="mt-5">
        <span className="font-semibold text-lg">Time Format </span>
        <div className="mt-2 gap-2 flex flex-col ">
          <KeyboardAndTimeSettingRow title="12 hours" />
          <KeyboardAndTimeSettingRow title="24 hours" />
        </div>
      </div>
    </>
  )
}

export default KeyboardAndTimeSetting

interface KeyboardAndTimeSettingRowProps {
  title: string
}
const KeyboardAndTimeSettingRow: FC<KeyboardAndTimeSettingRowProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <span>{title}</span>

      <div className="inline-flex items-center">
        <label className="relative flex items-center  rounded-full cursor-pointer" htmlFor="blue">
          <input
            name="color"
            type="radio"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            id="blue"
          />
          <span className="absolute text-blue-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </label>
      </div>
    </div>
  )
}
