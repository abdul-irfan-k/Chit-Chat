'use client'
import React from "react"
import CommunicatorProvider from "./communicator-provider"

export default function layout({ children }: { children: React.ReactNode }) {
    
    return (
    <>
      <CommunicatorProvider>{children}</CommunicatorProvider>
    </>
  )
}
