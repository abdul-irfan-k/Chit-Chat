import { useCallback, useEffect, useState } from "react"

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window == "undefined") return

    const media = window.matchMedia(`(max-width: ${width}px)`)
    if (media.addEventListener) {
      media.addEventListener("change", updateTarget)
    }
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }
    if (media.removeEventListener) {
      return () => media.removeEventListener("change", updateTarget)
    }
  }, [])

  return targetReached
}

export default useMediaQuery
