"use client"
import Messenger from "@/components/messenger/messenger"
import { getGroupDetailsHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useAppDispatch } from "@/store"
import React, { use, useEffect } from "react"
import { useSelector } from "react-redux"

const GroupPage = ({ params }: { params: { groupId: string } }) => {
  const dispatch = useAppDispatch()
  const { groupDetail, currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUsersListReducerState }) => state.chatUserAndGroupList,
  )

  useEffect(() => {
    if (currentChaterDetail?.currentChaterType == "group" && !currentChaterDetail.isGroupMemberDetailsAvailable) {
      dispatch(getGroupDetailsHandler(currentChaterDetail._id))
    }
  }, [params.groupId])

  return (
    <>
      <Messenger />
    </>
  )
}

export default GroupPage
