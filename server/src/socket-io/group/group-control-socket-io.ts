import mongoose from "mongoose"
import { SocketIo } from "../../types/socket-io/socket-io"
import GroupModel from "../../model/mongoose/group-model"

const groupControlSocketIo = (socket: SocketIo) => {
  socket.on("group:updateSetting", async ({ chatRoomId, groupDetail, senderId, setting }) => {
    try {
      const groupObjectId = new mongoose.Types.ObjectId(groupDetail._id)
      const userObjectId = new mongoose.Types.ObjectId(senderId)

      const updatedGroupModel = await GroupModel.findOneAndUpdate(
        { _id: groupObjectId, "adminsDetail.userId": userObjectId },
        { setting },
        { new: true },
      )

      if (updatedGroupModel == null) return console.log("not updated")
      socket
        .to(`group:${groupDetail._id}`)
        .emit("group:onUpdateSetting", { chatRoomId, groupDetail, senderId, setting })
    } catch (error) {
      console.log(error)
    }
  })
}

export default groupControlSocketIo
