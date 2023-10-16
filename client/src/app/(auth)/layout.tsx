import ReduxProvider from "@/provider/redux-provider/redux-provider"

interface AuthLayoutProps {
  children: React.ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  )
}
