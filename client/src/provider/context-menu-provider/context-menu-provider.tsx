"use client"
import MessageContextMenu from "@/components/shared/context-menu/message-context-menu/message-context-menu"
import React, { FC, useEffect, useState } from "react"

interface ContextMenuProviderProps {
  children: React.ReactNode
}

interface contextMenuContextArguments {
  showContextMenu: boolean
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>
  contextMenuDetails: messageContextMenu | undefined
  setContextMenuDetails: React.Dispatch<React.SetStateAction<messageContextMenu | undefined>>
  contextMenuPosition: { xPosition: number; yPosition: number } | null
  setContextMenuPosition: React.Dispatch<
    React.SetStateAction<{
      xPosition: number
      yPosition: number
    } | null>
  >
}
export const ContextMenuContext = React.createContext<contextMenuContextArguments | null>(null)
export const useContextMenuContext = () => React.useContext(ContextMenuContext)

// type  ContextMenuExtraArguments
const ContextMenuProvider: FC<ContextMenuProviderProps> = ({ children }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
  const [contextMenuDetails, setContextMenuDetails] = useState<messageContextMenu | undefined>(undefined)
  const [contextMenuPosition, setContextMenuPosition] = useState<{ xPosition: number; yPosition: number } | null>(null)

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowContextMenu(false)
    })

    return () => {
      document.removeEventListener("click", () => {})
    }
  }, [])

  return (
    <>
      <ContextMenuContext.Provider
        value={{
          showContextMenu,
          contextMenuPosition,
          contextMenuDetails,
          setContextMenuDetails,
          setShowContextMenu,
          setContextMenuPosition,
        }}
      >
        {showContextMenu && contextMenuDetails != undefined && (
          <>
            {contextMenuPosition != null && contextMenuDetails.type == "message" && (
              <MessageContextMenu
                xPosition={contextMenuPosition.xPosition}
                yPosition={contextMenuPosition.yPosition}
                isOutGoingMessage={contextMenuDetails.messageDetails.isOutGoingMessage}
                messageDetail={contextMenuDetails.messageDetails}
              />
            )}

            {showContextMenu && (
              <div className="fixed left-0 top-0 w-screen h-screen z-30 "
               style={{ background: "rgba(0,0,0,.4)" }}
              ></div>
            )}
          </>
        )}
        {children}
      </ContextMenuContext.Provider>
    </>
  )
}

export default ContextMenuProvider

interface messageDetails {
  _id: string
  isOutGoingMessage: boolean
}
interface textMessage extends messageDetails {
  messageType: "textMessage"
  messageContent: string
}

interface voiceMessage extends messageDetails {
  messageType: "voiceMessage"
  messageSrc: string
}
interface imageMessage extends messageDetails {
  messageType: "imageMessage"
  messageSrc: string
}
interface pollMessage extends messageDetails {
  messageType: "pollMessage"
}
interface videoMessage extends messageDetails {
  messageType: "videoMessage"
}

export type messageDetail = textMessage | voiceMessage | imageMessage | pollMessage | videoMessage
interface messageContextMenu {
  type: "message"
  messageDetails: messageDetail
}
