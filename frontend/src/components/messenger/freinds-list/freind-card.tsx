import Image from "next/image"
import { FC } from "react"

interface FriendsCardInterface {
  _id: string
  userId: string
  profileImageUrl: string
  name: string

  status: "accepted" | "rejected" | "pending"
  type: "freind" | "sentFreindRequest" | "recivedFreindRequest"
  onAcceptHandler?(): void
  onRejectHandler?(): void
}

const FriendsCard: FC<FriendsCardInterface> = ({
  profileImageUrl,
  name,
  status,
  userId,
  _id,
  type,
  onAcceptHandler,
  onRejectHandler,
}) => {
  return (
    <div className="gap-3 relative flex  items-center">
      <div className="relative  w-14 aspect-square md:w-[20%] ">
        <Image src={profileImageUrl} alt="user-image" fill className="rounded-3xl" />
      </div>

      <div className="gap-0 flex flex-col  justify-center ">
        <div className="font-medium text-base ">{name}</div>
        <div className="text-sm text-slate-800 dark:text-slate-200">{userId}</div>
      </div>

      {type == "recivedFreindRequest" && status == "pending" && (
        <div className="ml-auto gap-2 flex  items-center">
          <span className="text-red-400 border-[1px] border-red-400 px-2 py-1 rounded-full">reject</span>
          <span className="text-blue border-[1px] border-blue px-2 py-1 rounded-full">accept</span>
        </div>
      )}

      {type == "recivedFreindRequest" && status != "pending" && (
        <div className="ml-auto gap-2 flex  items-center">
          {status == "accepted" && <span className="text-green-400">accepted</span>}
          {status == "rejected" && <span className="text-red-400">rejected</span>}
        </div>
      )}
      {type == "sentFreindRequest" && (
        <div className="ml-auto gap-2 flex items-center">
          {status == "accepted" && <span className="text-green-400">accepted</span>}
          {status == "rejected" && <span className="text-red-400">rejected</span>}
          {status == "pending" && <span className="text-yellow-400">pending</span>}
        </div>
      )}
    </div>
  )
}

export default FriendsCard
