import {
  CorrectIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  MicIcon,
  VideoCamIcon,
  VideoIcon,
} from "@/constants/icon-constant"
import React, { FC, useState } from "react"

interface MediaDevice {
  deviceId: string
  deviceName: string
}
interface MediaSourceSelectorProps {
  onSelectHandler(selectedMenuType: "audio" | "video", deviceId: string): void
  availableMediaDevices: MediaDevice[]
  selectedMediaDevice?: MediaDevice
  mediaSelectorMenuType: "audio" | "video"
}
const MediaSourceSelector: FC<MediaSourceSelectorProps> = ({
  onSelectHandler,
  availableMediaDevices,
  selectedMediaDevice,
  mediaSelectorMenuType,
}) => {
  const [isPopUpedSelectMenu, setIsPopUpedSelectMenu] = useState<boolean>(false)

  return (
    <div className="relative">
      <div
        className="px-4 py-2 gap-1 flex items-center rounded-full self-auto bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 "
        onClick={() => setIsPopUpedSelectMenu(!isPopUpedSelectMenu)}
      >
        <div>{mediaSelectorMenuType == "audio" ? <MicIcon /> : <VideoCamIcon />}</div>
        <div>{selectedMediaDevice != undefined && selectedMediaDevice?.deviceName}</div>
        <div>{!isPopUpedSelectMenu ? <ExpandMoreIcon /> : <ExpandLessIcon />}</div>
      </div>
      {isPopUpedSelectMenu && (
        <div className="absolute gap-2 px-4 py-4 rounded-md flex flex-col  bottom-[100%]   w-[20vw] bg-slate-300 fill-slate-950  dark:bg-neutral-900">
          {availableMediaDevices.map((mediaDevice, index) => {
            const isSelectedDevice = mediaDevice.deviceName == selectedMediaDevice?.deviceName
            return (
              <div
                className="flex items-center"
                key={index}
                onClick={() => onSelectHandler(mediaSelectorMenuType, mediaDevice.deviceId)}
              >
                <div className="w-4 block">{isSelectedDevice && <CorrectIcon />}</div>
                <div className={" " + (isSelectedDevice ? " text-blue-500" : "")}>{mediaDevice.deviceName}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MediaSourceSelector
