import useDebounce from "@/hooks/use-debounce/use-debounce"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { chatUserListAction } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useAppDispatch } from "@/store"
import Image from "next/image"
import React, { FC, useState } from "react"
import { motion } from "framer-motion"
import { EditIcon } from "@/constants/icon-constant"

interface CurrentChatingGroupProfileProps {
  _id: string
  name: string
  profileImageSrc: string
  description: string
  isAdmin?: boolean
  setting: setting
}
interface setting {
  isAdminOnlySendMessage: boolean
  isAllowedJoinByUrl: boolean
  isHidingMembersNumber: boolean
}
const CurrentChatingGroupProfile: FC<CurrentChatingGroupProfileProps> = ({
  _id,
  description,
  name,
  profileImageSrc,
  isAdmin,
  setting,
}) => {
  const [groupSetting, setGroupSetting] = useState<setting>(setting)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const onGroupSettingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSetting({ ...setting, [e.target.name]: e.target.checked })
    dispatch(
      chatUserListAction.updateGroupSetting({
        setting: { ...groupSetting, isAdminOnlySendMessage: e.target.checked },
        _id,
      }),
    )
    setInitialRender(false)
  }

  useDebounce(
    () => {
      if (initialRender) return
    },
    2000,
    [groupSetting],
  )

  return (
    <motion.div
      key={"chaterProfile"}
      className="fixed  right-0 top-0 h-screen w-[25vw]  overflow-y-scroll    bg-slate-200 dark:bg-neutral-950 z-[70] no-scrollbar"
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
    >
      <div className="absolute right-3 top-3">
        <EditIcon />
      </div>
      <div className="relative mt-10 mx-auto w-[40%] aspect-square overflow-hidden rounded-full">
        <Image src={profileImageSrc} fill alt="profile image" />
      </div>
      <div className="mt-5 flex flex-col items-center">
        <span className="text-xl font-bold">{name}</span>
      </div>

      <div className="mt-10">
        <div className="px-5 flex justify-between">
          <span>Admin Only Send Message</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              name="isAdminOnlySendMessage"
              checked={groupSetting.isAdminOnlySendMessage}
              onChange={onGroupSettingChangeHandler}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="mt-3 px-5 flex justify-between">
          <span>Media File Links</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="mt-3 px-5 flex justify-between">
          <span>Disappear Message</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-5 gap-2 px-5 flex items-center">
        <div className="px-4 py-2 text-base rounded-full bg-sky-200 text-blue-500">Media</div>
        <div className="px-4 py-2 text-base rounded-full">Files</div>
        <div className="px-4 py-2 text-base rounded-full">Linkes</div>
      </div>

      <div className="gap-1 gap-y-3 mt-5 px-5  flex flex-wrap justify-between">
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentChatingGroupProfile
