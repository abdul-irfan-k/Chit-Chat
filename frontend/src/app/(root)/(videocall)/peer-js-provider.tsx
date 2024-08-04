"use client"

interface PeerJsProviderProps {
  children: React.ReactNode
}
const PeerJsProvider = ({ children }: PeerJsProviderProps) => {
  return <>{children}</>
}

export default PeerJsProvider
