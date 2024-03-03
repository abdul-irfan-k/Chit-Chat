"use client"
import { getChatRoomMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { FC, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"

interface MessageInfiniteScrollProps {
  children: React.ReactNode
  userDetail: userDetailState['userDetail']
  currentChaterDetail: chatUsersListReducerState['currentChaterDetail']
  totatMessages?: number
  totalFetchedMessages?: number
}
const MessageInfiniteScroll: FC<MessageInfiniteScrollProps> = ({
  children,
  currentChaterDetail,
  userDetail,
  totalFetchedMessages,
  totatMessages,
}) => {
  const dispatch = useAppDispatch()

  const [] = useState()
  const [hasMore, setHasMore] = useState(false)
  const fetchMoreDataHandler = () => {
    console.log("fetch more data handler")
    const skip = totalFetchedMessages != undefined ? Math.floor(totalFetchedMessages / 10) : 1
    if (currentChaterDetail?.currentChaterType == "user" && userDetail != null) {
      dispatch(
        getChatRoomMessageHandler({
          chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId,
          myUserId: userDetail?._id,
          limit: 10,
          skip: 1,
          step: 10,
        }),
      )
    }
  }

  return (
    <InfiniteScroll
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
      // isReverse
      loadMore={fetchMoreDataHandler}
    >
      {children}
    </InfiniteScroll>
  )
}

export default MessageInfiniteScroll
