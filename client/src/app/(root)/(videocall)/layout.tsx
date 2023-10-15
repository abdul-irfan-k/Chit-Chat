import PeerJsProvider from "./peer-js-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function VideoPageRootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <PeerJsProvider>{children}</PeerJsProvider>
    </>
  )
}
