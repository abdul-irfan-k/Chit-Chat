import SideBar from "@/components/messenger/sidebar/sidebar"

interface RootLayoutProps {
  children: React.ReactNode
}
export default function MessengerLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex gap-5 w-full flex-1 ">
      <div className="relative  w-full md:w-[50%] lg:w-[35%] xl:w-[34%] ">
        <SideBar />
      </div>
      {children}
    </div>
  )
}
