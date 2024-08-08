"use client"

import MessageSvg from "/public/Asset/Icon/message.svg"
import PhoneSvg from "/public/Asset/Icon/phone.svg"
import IdBadge from "/public/Asset/Icon/id-badge.svg"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { useSelector } from "react-redux"
import { CallIcon, CallMadeIcon, CallMissedIcon, CallReceivedIcon } from "@/constants/icon-constant"
import { changeMessengerSortState } from "@/redux/actions/messenger-action/messenger-action"
import { useAppDispatch } from "@/store"
import { Contact, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const MessengerSort = () => {
  const dispatch = useAppDispatch()
  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )

  const check = () => console.log("sort", messengerSortType, subSelectionType)

  const messengerPrimarySortHandler = (messengerSort: "chat" | "call" | "contact") => {
    if (messengerSort == "chat")
      dispatch(changeMessengerSortState({ messengerSortType: "chat", subSelectionType: "direct" }))
    if (messengerSort == "call")
      dispatch(changeMessengerSortState({ messengerSortType: "call", subSelectionType: "allCall" }))
    if (messengerSort == "contact")
      dispatch(changeMessengerSortState({ messengerSortType: "contact", subSelectionType: "all" }))
  }

  const chatSubSortHandler = (subSort: "direct" | "group" | "all") => {
    dispatch(changeMessengerSortState({ messengerSortType: "chat", subSelectionType: subSort }))
  }
  const callSubSortHandler = (subSort: "allCall" | "incomingCall" | "outgoingCall" | "missedCall") => {
    dispatch(changeMessengerSortState({ messengerSortType: "call", subSelectionType: subSort }))
  }
  const contactSubSortHandler = (subSort: "all" | "closeFreinds") => {
    dispatch(changeMessengerSortState({ messengerSortType: "contact", subSelectionType: subSort }))
  }

  return (
    <div className=" relative flex flex-col text-slate-950 dark:text-slate-50">
      <div className=" font-extrabold text-lg md:text-xl xl:text-2xl " onClick={check}>
        Chat
      </div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">Start New Converstion</div>

      <div className="mt-10 gap-5 flex justify-between items-center  fill-slate-950 font-medium text-base  dark:fill-slate-50">
        <Button
          className={
            "relative gap-1  py-2 w-full rounded-full flex justify-center items-center " +
            (messengerSortType != "chat" ? "bg-[#2e3038]" : "")
          }
          onClick={() => messengerPrimarySortHandler("chat")}
          variant={messengerSortType == "chat" ? "secondary" : "ghost"}
        >
          <MessageCircle className="relative w-5 aspect-square " />
          <div className=""> Chat</div>
        </Button>
        <Button
          className={
            "relative gap-1  py-2 w-full rounded-full flex justify-center items-center " +
            (messengerSortType != "call" ? "bg-[#2e3038]" : "")
          }
          onClick={() => messengerPrimarySortHandler("call")}
          variant={messengerSortType == "call" ? "secondary" : "ghost"}
        >
          <Phone className="aspect-square w-5" />
          <div className=""> Call</div>
        </Button>
        <Button
          className={
            "relative gap-1  py-2 w-full rounded-full flex justify-center items-center " +
            (messengerSortType != "contact" ? "bg-[#2e3038]" : "")
          }
          onClick={() => messengerPrimarySortHandler("contact")}
          variant={messengerSortType == "contact" ? "secondary" : "ghost"}
        >
          <Contact className="aspect-square w-5" />
          <div className=""> Contact</div>
        </Button>
      </div>

      {messengerSortType == "chat" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "direct" ? "bg-[#2e3038]" : "")
            }
            onClick={() => chatSubSortHandler("direct")}
            variant={subSelectionType == "direct" ? "secondary" : "ghost"}
          >
            Direct
          </Button>
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "group" ? "bg-[#2e3038]" : "")
            }
            onClick={() => chatSubSortHandler("group")}
            variant={subSelectionType == "group" ? "secondary" : "ghost"}
          >
            Group
          </Button>
        </div>
      )}
      {messengerSortType == "call" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "allCall" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => callSubSortHandler("allCall")}
          >
            <div className="relative w-5 ">
              <CallIcon className="aspect-square" />
            </div>
            <div className=""> All</div>
          </div>
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "incomingCall" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => callSubSortHandler("incomingCall")}
          >
            <div className="relative w-5 ">
              <CallReceivedIcon className="aspect-square" />
            </div>
          </div>
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "outgoingCall" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => callSubSortHandler("outgoingCall")}
          >
            <div className="relative w-5 ">
              <CallMadeIcon className="aspect-square" />
            </div>
          </div>
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "missedCall" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => callSubSortHandler("missedCall")}
          >
            <div className="relative w-5 ">
              <CallMissedIcon className="aspect-square" />
            </div>
          </div>
        </div>
      )}
      {messengerSortType == "contact" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "all" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => contactSubSortHandler("all")}
          >
            <div className="relative w-5 ">
              <IdBadge className="aspect-square" />
            </div>
            <div className=""> All</div>
          </div>
          <div
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType == "closeFreinds" ? "dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-800")
            }
            onClick={() => contactSubSortHandler("closeFreinds")}
          >
            <div className="relative w-5 ">
              <IdBadge className="aspect-square" />
            </div>
            <div className=""> Favorite</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessengerSort
