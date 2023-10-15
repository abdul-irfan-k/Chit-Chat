"use client"

import { callRequestReducerSlate } from "@/redux/reducers/call-request-reducer/call-request-reducer"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const CallRequestMenuCotainer = () => {
  const [isPopUpedRequest, setIsPopUpedRequest] = useEffect<boolean>()
  const { isCalling, callRequestData } = useSelector(
    (state: { callRequestReducer: callRequestReducerSlate }) => state.callRequestReducer,
  )

  useEffect(() => {
    console.log("request data is changed ")
  }, [callRequestData])

  return <div></div>
}

export default CallRequestMenuCotainer
