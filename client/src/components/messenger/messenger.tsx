import ChatList from "./chat/chat-list/chat-list"
import MessengerSort from "./messenger-sort/messenger-sort"
import Recent from "./recent/recent"
import SideMenu from "./side-menu/side-menu"
import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"

const Messenger = () => {
  return (
    <div className="relative flex gap-5 ">
      <div className="relative w-14">
        <div className="absolute">
          <SideMenu />
        </div>
      </div>

      <div className="relative  md:w-[50%] lg:w-[35%] xl:w-[27%] ">
        <div className="absolute ">
          <div className="fixed flex flex-col px-10 pt-14 h-[100vh]  bg-slate-200 dark:bg-neutral-950 md:w-[50%] lg:w-[35%] xl:w-[27%] ">
            <Recent />
            <div className="mt-10 flex flex-col overflow-y-scroll no-scrollbar">
              <MessengerSort />
              <ChatList />
            </div>
          </div>
        </div>
      </div>

     {/* <ChatContainer /> */}
      {/* <CallLogContainer /> */}
      <ContactContainer />
    </div>
  )
}

export default Messenger
