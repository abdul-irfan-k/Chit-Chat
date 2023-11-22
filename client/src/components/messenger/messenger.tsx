import ChatList from "./chat-list/chat-list"
import MessengerSort from "./messenger-sort/messenger-sort"
import Recent from "./recent/recent"
import SideMenu from "./side-menu/side-menu"
import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"
import AddButton from "./add-button/add-buttton"

const Messenger = () => {
  return (
    <div className="relative flex gap-5 w-full flex-1 ">
      <div className="relative  w-full md:w-[50%] lg:w-[35%] xl:w-[34%] ">
        <div className="relative flex flex-col px-5 pt-4  h-[100vh]  bg-slate-200 dark:bg-neutral-950 md:pt-14 ">
          <Recent />
          <div className="mt-10 flex flex-col overflow-y-scroll no-scrollbar">
            <MessengerSort />
            <ChatList />
          </div>
        <AddButton />
        </div>
      </div>
      <div className="hidden w-full md:block">
        <ChatContainer />
        <CallLogContainer />
        <ContactContainer />
      </div>

    </div>
  )
}

export default Messenger
