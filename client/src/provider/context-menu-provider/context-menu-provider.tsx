"use client"
import MessageContextMenu from "@/components/shared/context-menu/message-context-menu/message-context-menu"
import React, { FC, useEffect, useState } from "react"

interface ContextMenuProviderProps {
  children: React.ReactNode
}

interface contextMenuContextArguments {
  showContextMenu: boolean
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>
  contextMenuType: "message" | "video" | undefined
  setContextMenuType: React.Dispatch<React.SetStateAction<"message" | "video" | undefined>>
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

const ContextMenuProvider: FC<ContextMenuProviderProps> = ({ children }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
  const [contextMenuType, setContextMenuType] = useState<"message" | "video" | undefined>(undefined)
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
          contextMenuType,
          setContextMenuType,
          setShowContextMenu,
          setContextMenuPosition,
        }}
      >
        {showContextMenu && contextMenuType == "message" && (
          <MessageContextMenu xPosition={contextMenuPosition?.xPosition} yPosition={contextMenuPosition?.yPosition} />
        )}
        {children}
      </ContextMenuContext.Provider>
    </>
  )
}

export default ContextMenuProvider
