import React from "react"

const NormalSetting = () => {
  return (
    <div>
      <div className="mt-5">
        <span className=" font-semibold text-lg">setting</span>
      </div>
      <div className="mt-3 gap-2 w-full ">
        <div className="flex justify-between">
          <span >Manage Text Size</span>
          <span >18</span>
        </div>
        <div className="relative   w-full">
          <input type="range" className=" w-full input-range h-3 rounded-full" defaultValue={0} />
        </div>
      </div>
    </div>
  )
}

export default NormalSetting
