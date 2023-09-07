import Image from "next/image"

const Recent = () => {
  return (
    <div className=" w-[100%]  flex flex-col  ">
      <div className="text-slate-950 font-extrabold text-lg md:text-xl xl:text-2xl dark:text-slate-50">
        Recent
      </div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">
        Chat from your freinds
      </div>
      <div className="mt-5 gap-3 flex overflow-x-auto no-scrollbar">
        <div className="relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
          <Image
            src={"/Asset/avatar.jpg"}
            fill
            alt="image"
            className="opacity-[0.65] rounded-xl"
          />
          <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
            <div className="text-base text-slate-50">irfan</div>
            <div className="block w-2  bg-red-500 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
          <Image
            src={"/Asset/avatar.jpg"}
            fill
            alt="image"
            className="opacity-[0.65] rounded-xl"
          />
          <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
            <div className="text-base text-slate-50">irfan</div>
            <div className="block w-2  bg-red-500 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
          <Image
            src={"/Asset/avatar.jpg"}
            fill
            alt="image"
            className="opacity-[0.65] rounded-xl"
          />
          <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
            <div className="text-base text-slate-50">irfan</div>
            <div className="block w-2  bg-yellow-400 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
          <Image
            src={"/Asset/avatar.jpg"}
            fill
            alt="image"
            className="opacity-[0.65] rounded-xl"
          />
          <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
            <div className="text-base text-slate-50">irfan</div>
            <div className="block w-2  bg-red-500 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
          <Image
            src={"/Asset/avatar.jpg"}
            fill
            alt="image"
            className="opacity-[0.65] rounded-xl"
          />
          <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
            <div className="text-base text-slate-50">irfan</div>
            <div className="block w-2  bg-red-500 aspect-square rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recent
