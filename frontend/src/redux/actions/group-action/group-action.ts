import { axiosChatInstance, axiosUploadInstance } from "@/constants/axios"
import { AppDispatch } from "@/store"

export const createGroupHandler = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const { formData } = data
    const { data: response } = await axiosUploadInstance.post("/uploadSingleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    if (response.fileUrl) {
      const { data: group } = await axiosChatInstance.post("/groups", {
        name: data.name,
        members: data.members,
        imageUrl: response.fileUrl,
      })
    }
  } catch (error) {}
}
