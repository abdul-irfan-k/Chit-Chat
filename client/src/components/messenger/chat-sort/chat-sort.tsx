import MessageSvg from "/public/Asset/Icon/message.svg"
import PhoneSvg from "/public/Asset/Icon/phone.svg"
import IdBadge from "/public/Asset/Icon/id-badge.svg"

const ChatSort = () => {
  return (
    <div className=" relative flex flex-col text-slate-950 dark:text-slate-50">
      <div className=" font-extrabold text-lg md:text-xl xl:text-2xl ">
        Chat
      </div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">
        Start New Converstion
      </div>

      <div className="mt-10 gap-5 flex justify-between items-center  fill-slate-950 font-medium text-base  dark:fill-slate-50">
        <div className="gap-1 py-2 w-full rounded-full flex justify-center items-center bg-slate-300 dark:bg-neutral-800">
          <div className="relative w-5 ">
            <MessageSvg className="aspect-square" />
          </div>
          <div className=""> Chat</div>
        </div>
        <div className="gap-1 py-2 w-full rounded-full flex justify-center items-center bg-slate-300 dark:bg-neutral-800">
          <div className="relative w-5">
            <PhoneSvg className="aspect-square" />
          </div>
          <div className=""> Call</div>
        </div>
        <div className="gap-1 py-2 w-full rounded-full flex justify-center items-center bg-slate-300 dark:bg-neutral-800">
          <div className="relative w-5 ">
            <IdBadge className="aspect-square" />
          </div>
          <div className=""> Chat</div>
        </div>
      </div>

      <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
        <div className="gap-1  py-2 w-full rounded-full flex justify-center items-center bg-slate-300 dark:bg-neutral-800">
          <div className="relative w-5 ">
            <IdBadge className="aspect-square" />
          </div>
          <div className=""> Direct</div>
        </div>
        <div className="gap-1  py-2 w-full rounded-full flex justify-center items-center bg-slate-300 dark:bg-neutral-800">
          <div className="relative w-5 ">
            <IdBadge className="aspect-square" />
          </div>
          <div className=""> Group</div>
        </div>
      </div>
    </div>
  )
}

export default ChatSort
