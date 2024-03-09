import { axiosMeetingInstance } from "@/constants/axios"
import { AppDispatch } from "@/store"

const getCallLogsHandler =
  ({ myUserId, skip = 0, step = 10, limit = 10 }: { myUserId?: string; skip: number; step: number; limit: number }) =>
  async (dispatch: AppDispatch) => {
    try {  
        const { data } = await axiosMeetingInstance.post("/getCallLogs", { myUserId, skip, step, limit })
    } catch (error) {
        
    }
  }
