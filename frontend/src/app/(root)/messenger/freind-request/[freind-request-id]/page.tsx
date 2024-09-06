"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const FreindRequestPage = () => {
  const [freindRequest, setFreindRequest] = useState<undefined | any>(undefined)

  const searchParams = useSearchParams()
  const freindRequestId = searchParams.get("freind-request-id")
  useEffect(() => {
    ;(async () => {
      
    })()
  }, [freindRequestId])

  return <div className="w-full "></div>
}

export default FreindRequestPage
