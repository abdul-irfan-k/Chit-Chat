import React, { useEffect } from "react"
const useOutsideClick = (componentRef: React.RefObject<HTMLDivElement>, callback: () => void) => {
  const handleOutSideClick: any = (event: React.MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutSideClick)

    return () => {
      document.removeEventListener("click", handleOutSideClick)
    }
  })
}

export default useOutsideClick
