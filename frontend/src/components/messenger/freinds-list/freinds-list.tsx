"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import MobileChatContainer from "../chat/mobile-chat-container/mobile-chat-container"
import useMediaQuery from "@/hooks/user-media-query/use-media-query"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import ChatListBox from "./chat-list-box/chat-list-box"
import FriendsCard from "./freind-card"
import {
  acceptFriendRequestHandler,
  getFreindsListHandler,
  rejectFriendRequestHandler,
} from "@/redux/actions/chat-action/chat-action"

const FriendsList = () => {
  const [freinds, setFreinds] = useState<any>([])
  const [sentFreindRequest, setSentFreindRequest] = useState<any>([])
  const [receivedFreindRequest, setReceivedFreindRequest] = useState<any>([])

  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )

  useEffect(() => {
    if (freinds.length > 0) return
    ;(async () => {
      try {
        //@ts-ignore
        const { freinds, sendedFreindRequests, receivedFreindRequests } = await getFreindsListHandler()
        setFreinds(freinds)
        setSentFreindRequest(sendedFreindRequests)
        setReceivedFreindRequest(receivedFreindRequests)
      } catch (error) {}
    })()
  }, [])

  const handleOnAcceptButtonClick = async (userId: string) => {
    try {
      await acceptFriendRequestHandler({ friendRequestorId: userId, isAcceptedFreindRequest: true })
    } catch (error) {}
  }

  const handleOnRejectButtonClick = async (userId: string) => {
    try {
      await rejectFriendRequestHandler({ friendRequestorId: userId, isAcceptedFreindRequest: false })
    } catch (error) {}
  }
  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      {messengerSortType == "freinds" &&
        subSelectionType == "all" &&
        freinds.map((freinds, index) => {
          return (
            // <Link href={`/messenger/${freinds.userId}`} key={index}>
            <FriendsCard
              key={index}
              onClickHandler={() => {}}
              {...freinds.userDetails}
              status={"accepted"}
              type="freind"
            />
            // </Link>
          )
        })}
      {messengerSortType == "freinds" &&
        subSelectionType == "sendFreindRequest" &&
        sentFreindRequest.map((freinds, index) => {
          return (
            // <Link href={`/messenger/${freinds.userId}`} key={index}>
            <FriendsCard
              key={index}
              onClickHandler={() => {}}
              {...freinds.userDetails}
              status={freinds.status}
              type="sentFreindRequest"
            />
            // </Link>
          )
        })}
      {messengerSortType == "freinds" &&
        subSelectionType == "recivedFreindRequest" &&
        receivedFreindRequest.map((freinds, index) => {
          return (
            // <Link href={`/messenger/${freinds.userId}`} key={index}>
            <FriendsCard
              onClickHandler={() => {}}
              {...freinds.userDetails}
              status={freinds.status}
              type="recivedFreindRequest"
              onAcceptHandler={() => handleOnAcceptButtonClick(freinds.userDetails._id)}
              onRejectHandler={() => handleOnRejectButtonClick(freinds.userDetails._id)}
            />
            // </Link>
          )
        })}

      {/* {isMobile && isSelectedUser && <MobileChatContainer backButtonHandler={mobileBackButtonHandler} />} */}
    </div>
  )
}

export default FriendsList
