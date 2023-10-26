import ChatList from "./chat-list/chat-list"
import MessengerSort from "./messenger-sort/messenger-sort"
import Recent from "./recent/recent"
import SideMenu from "./side-menu/side-menu"
import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"

const Messenger = () => {
  return (
    <div className="relative flex gap-5 w-full flex-1 ">
      <div className="relative  md:w-[50%] lg:w-[35%] xl:w-[27%] ">
        <div className="relative flex flex-col px-10 pt-14 h-[100vh]  bg-slate-200 dark:bg-neutral-950  ">
          <Recent />
          <div className="mt-10 flex flex-col overflow-y-scroll no-scrollbar">
            <MessengerSort />
            <ChatList />
          </div>
        </div>
      </div>
      <div className=" w-full">
        <ChatContainer />
        <CallLogContainer />
        <ContactContainer />
      </div>
    </div>
  )
}

export default Messenger
