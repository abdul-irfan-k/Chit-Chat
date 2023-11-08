"use client"
import { MicIcon, MicSlashIcon, VideoCamIcon, VideoSlashIcon } from "@/constants/icon-constant"
import { callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"
import React, { FC, useContext, useState } from "react"
import { useSelector } from "react-redux"
import MediaSourceSelector from "./media-source-selector"
import { useAppDispatch } from "@/store"
import { changeCallSettingHandler } from "@/redux/actions/call-action/call-action"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"

interface MeetingJoinFormProps {
  meetingCode: string
}

const MeetingJoinForm: FC<MeetingJoinFormProps> = ({ meetingCode }) => {
  const dispatch = useAppDispatch()
  const videoContext = useContext(PeerVideoRefContext)

  const { socket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false)
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(false)

  const joinRequestButtonHandler = () => {
    socket.emit("groupCall:joinRequest", {
      userId: userDetail?._id,
      referenceId: meetingCode,
      userName: userDetail?.name,
    })
  }
  const cancelButtonHandler = () => {}

  const { callSetting } = useSelector((state: { callRedcuer: callReducerSlate }) => state.callRedcuer)
  const mediaonSelectHandler = (selectedMenuType: "audio" | "video", deviceId: string) => {
    if (selectedMenuType == "audio") {
    } else if (selectedMenuType == "video") {
    }
  }

  const changeVideoDevicePermissionHandler = () => {
    if (isVideoRecording) dispatch(changeCallSettingHandler({ isAllowedCamara: false }))
    else dispatch(changeCallSettingHandler({ isAllowedCamara: true }))
    setIsVideoRecording(!isVideoRecording)
  }

  const changeAudioDevicePermissionHandler = () => {
    if (isAudioRecording) dispatch(changeCallSettingHandler({ isAllowedMicrophone: false }))
    else dispatch(changeCallSettingHandler({ isAllowedMicrophone: true }))
    setIsAudioRecording(!isAudioRecording)
  }

  return (
    <div className="px-10 py-10   h-full w-full flex flex-col justify-center  rounded-2xl md:bg-slate-200 md:dark:bg-neutral-950 md:w-[80%] md:h-[90%]">
      <div className="flex  ">
        <div className="relative w-[50%] ">
          <div className="relative first-letter: w-full">
            <div className="w-full  aspect-video bg-slate-300  dark:bg-neutral-700">
              {videoContext.videoStream != undefined && isVideoRecording && (
                <video
                  autoPlay
                  className="w-full h-full"
                  ref={(ref) => {
                    if (ref != null) ref.srcObject = videoContext.videoStream
                  }}
                />
              )}
            </div>

            <div className="gap-3 left-0 w-full absolute bottom-2 flex-1 flex justify-center items-center ">
              <div
                className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 "
                onClick={changeAudioDevicePermissionHandler}
              >
                {isAudioRecording ? (
                  <MicIcon className="aspect-square w-6" width="" height="" />
                ) : (
                  <MicSlashIcon className="aspect-square w-6" width="" height="" />
                )}
              </div>
              <div
                className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 "
                onClick={changeVideoDevicePermissionHandler}
              >
                {isVideoRecording ? (
                  <VideoCamIcon className="aspect-square w-6" width="" height="" />
                ) : (
                  <VideoSlashIcon className="aspect-square w-6" width="" height="" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 gap-2  flex items-center">
            <MediaSourceSelector
              availableMediaDevices={
                callSetting?.availabeAudioDevices != undefined ? callSetting.availabeAudioDevices : []
              }
              mediaSelectorMenuType="audio"
              onSelectHandler={mediaonSelectHandler}
              selectedMediaDevice={
                callSetting?.currentSelectedAudioDevice != undefined
                  ? {
                      deviceId: callSetting.currentSelectedAudioDevice.deviceId,
                      deviceName: callSetting.currentSelectedAudioDevice.deviceName,
                    }
                  : { deviceId: "", deviceName: "Default" }
              }
            />
            <MediaSourceSelector
              availableMediaDevices={
                callSetting?.availabeVideoDevices != undefined ? callSetting.availabeVideoDevices : []
              }
              mediaSelectorMenuType="video"
              onSelectHandler={mediaonSelectHandler}
              selectedMediaDevice={
                callSetting?.currentSelectedVideoDevice != undefined
                  ? {
                      deviceId: callSetting.currentSelectedVideoDevice.deviceId,
                      deviceName: callSetting.currentSelectedVideoDevice.deviceName,
                    }
                  : { deviceId: "", deviceName: "Default" }
              }
            />
          </div>
        </div>

        <div className="gap-5 flex flex-col justify-center items-center flex-1">
          <div className="text-xl">Ready to join?</div>
          <div className="text-base font-medium">No one else is here </div>
          <div className="gap-3  flex ">
            <div
              className="px-4 py-2 flex items-center justify-center rounded-full bg-red-500"
              onClick={cancelButtonHandler}
            >
              cancel
            </div>
            <div
              className="px-4 py-2 flex items-center justify-center rounded-full bg-blue-500"
              onClick={joinRequestButtonHandler}
            >
              join now
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingJoinForm
