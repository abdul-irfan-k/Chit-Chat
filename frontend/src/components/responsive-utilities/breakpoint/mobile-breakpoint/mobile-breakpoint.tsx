import React from "react"
import { useMediaQuery } from "react-responsive"

interface MobileBreakPointProps {
  children: React.ReactNode
}
const MobileBreakPoint = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return isMobile ? children : null
}

export default MobileBreakPoint
