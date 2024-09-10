import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import GroupModel from "../model/mongoose/group-model"

export const adminOnlyAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params
    const userId = req?.user?._id as string

    if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid groupId or userId" })
    }

    const group = await GroupModel.findById(groupId)
    if (!group) {
      return res.status(404).json({ message: "Group not found" })
    }

    const isAdmin = group.adminsDetail.some((admin) => admin?.userId?.equals(userId))
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." })
    }

    next()
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Server error", error: error.message })
  }
}
