import { useEffect } from "react"


export default function useDebounce(callback:() => any, delay:number, dependencies:Array<any>) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback()
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  },[dependencies])

  return {}
}
