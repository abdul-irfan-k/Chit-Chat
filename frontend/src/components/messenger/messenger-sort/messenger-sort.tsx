"use client"

import MessageSvg from "/public/Asset/Icon/message.svg"
import PhoneSvg from "/public/Asset/Icon/phone.svg"
import IdBadge from "/public/Asset/Icon/id-badge.svg"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { useSelector } from "react-redux"
import { CallIcon, CallMadeIcon, CallMissedIcon, CallReceivedIcon } from "@/constants/icon-constant"
import { changeMessengerSortState } from "@/redux/actions/messenger-action/messenger-action"
import { useAppDispatch } from "@/store"
import { Contact, MessageCircle, Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing } from "lucide-react"
import { Button } from "@/components/ui/button"

const MessengerSort = () => {
  const dispatch = useAppDispatch()
  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )

  const handleMessengerSelection = (messengerSort: messengerSortState["messengerSortType"]) => {
    if (messengerSort == "chat")
      dispatch(changeMessengerSortState({ messengerSortType: "chat", subSelectionType: "direct" }))
    if (messengerSort == "call")
      dispatch(changeMessengerSortState({ messengerSortType: "call", subSelectionType: "allCall" }))
    if (messengerSort == "freinds")
      dispatch(changeMessengerSortState({ messengerSortType: "freinds", subSelectionType: "all" }))
  }

  const handleSubSelection = (subSelectionType: messengerSortState["subSelectionType"]) => {
    dispatch(changeMessengerSortState({ messengerSortType, subSelectionType }))
  }

  return (
    <div className=" relative flex flex-col text-slate-950 dark:text-slate-50">
      <div className=" font-extrabold text-lg md:text-xl xl:text-2xl ">Chat</div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">Start New Converstion</div>

      <div className="mt-10 gap-5 flex justify-between items-center  fill-slate-950 font-medium text-base  dark:fill-slate-50">
        <Button
          className={
            "relative gap-1  py-2 w-full rounded-full flex justify-center items-center " +
            (messengerSortType != "chat" ? "bg-[#2e3038]" : "")
          }
          onClick={() => handleMessengerSelection("chat")}
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
          onClick={() => handleMessengerSelection("call")}
          variant={messengerSortType == "call" ? "secondary" : "ghost"}
        >
          <Phone className="aspect-square w-5" />
          <div className=""> Call</div>
        </Button>
        <Button
          className={
            "relative gap-1  py-2 w-full rounded-full flex justify-center items-center " +
            (messengerSortType != "freinds" ? "bg-[#2e3038]" : "")
          }
          onClick={() => handleMessengerSelection("freinds")}
          variant={messengerSortType == "freinds" ? "secondary" : "ghost"}
        >
          <Contact className="aspect-square w-5" />
          <div className=""> Freinds</div>
        </Button>
      </div>

      {messengerSortType == "chat" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "direct" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("direct")}
            variant={subSelectionType == "direct" ? "secondary" : "ghost"}
          >
            Direct
          </Button>
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "group" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("group")}
            variant={subSelectionType == "group" ? "secondary" : "ghost"}
          >
            Group
          </Button>
        </div>
      )}
      {messengerSortType == "call" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "allCall" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("allCall")}
            variant={subSelectionType == "allCall" ? "secondary" : "ghost"}
          >
            <Phone className="aspect-square w-5" />
            All
          </Button>

          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "incomingCall" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("incomingCall")}
            variant={subSelectionType == "incomingCall" ? "secondary" : "ghost"}
          >
            <PhoneIncoming className="aspect-square w-5" />
          </Button>

          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "outgoingCall" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("outgoingCall")}
            variant={subSelectionType == "outgoingCall" ? "secondary" : "ghost"}
          >
            <PhoneOutgoing className="aspect-square w-5" />
          </Button>
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "missedCall" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("missedCall")}
            variant={subSelectionType == "missedCall" ? "secondary" : "ghost"}
          >
            <PhoneMissed className="aspect-square w-5" />
          </Button>
        </div>
      )}
      {messengerSortType == "freinds" && (
        <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "all" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("all")}
            variant={subSelectionType == "all" ? "secondary" : "ghost"}
          >
            freinds
          </Button>
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "sendFreindRequest" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("sendFreindRequest")}
            variant={subSelectionType == "sendFreindRequest" ? "secondary" : "ghost"}
          >
            sent
          </Button>
          <Button
            className={
              "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
              (subSelectionType != "recivedFreindRequest" ? "bg-[#2e3038]" : "")
            }
            onClick={() => handleSubSelection("recivedFreindRequest")}
            variant={subSelectionType == "recivedFreindRequest" ? "secondary" : "ghost"}
          >
            received
          </Button>
        </div>
      )}
    </div>
  )
}

export default MessengerSort
