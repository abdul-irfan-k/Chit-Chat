import ChatList from "./ChaList/ChatList"
import ChatBox from "./ChatBox/ChatBox"
import ChatSort from "./ChatSort/ChatSort"
import InputBox from "./InputBox/InputBox"
import Profile from "./Profile/Profile"
import Recent from "./Recent/Recent"
import SideMenu from "./SideMenu/SideMenu"

const Messenger = () => {
  return (
    <div className=" flex gap-5">
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
              <ChatSort />
              <ChatList />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-10  gap- flex flex-col  w-[60%]">
        <Profile
          currentStatus="ofline"
          profileImageSrc="/Asset/avatar.jpg"
          name="irfan"
        />

        <ChatBox />
        <InputBox />
      </div>
    </div>
  )
}

export default Messenger
