import { axiosMeetingInstance } from "@/constants/axios"
import { callReducerAction, callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"
import { AppDispatch } from "@/store"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

export const addInitialCallDataHandler = (data: any, id: string) => async (dispatch: AppDispatch) => {
  const myDetail = data.callRoomUserDetails.filter((userDetail) => userDetail.userId === id)[0]
  const communicatorsDetail = data.callRoomUserDetails.filter((userDetail) => userDetail.userId != id)

  dispatch(
    callReducerAction.addIntialCallData({
      isChanged: true,
      callDetail: {
        callRoomId: data.callRoomId,
        chatRoomId: data.chatRoomId,
        callType: data.callType,
        callChannelType: data.callChannelType,
        myDetail,
        communicatorsDetail,
      },
      callStatus: "active",
      isAvailableCallRoom: true,
      connectionRequiredPeers:{
        allPeers:communicatorsDetail
      }
    }),
  )
}

export const addAvailableMediaDevices =
  (
    audioDevices: Array<{ deviceId: string; deviceName: string }>,
    videoDevices: Array<{ deviceId: string; deviceName: string }>,
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(
      callReducerAction.changeCallSetting({ availabeAudioDevices: audioDevices, availabeVideoDevices: videoDevices }),
    )
  }

export const changeCallSettingHandler = (data) => async (dispatch: AppDispatch) => {
  dispatch(callReducerAction.changeCallSetting(data))
}

export const addScreenSharingHandler = () => async (dispatch: AppDispatch) => {
  dispatch(callReducerAction.changeCallSetting({ isAllowedScreenShare: true }))
}

export const removeScreenSharingHandler = () => async (dispatch: AppDispatch) => {
  dispatch(callReducerAction.changeCallSetting({ isAllowedScreenShare: false }))
}

export const addCallSettingHandler = (data) => async (dispatch: AppDispatch) => {
  dispatch(
    callReducerAction.addCallSetting({
      isAllowedScreenShare: false,
      isAllowedCamara: false,
      isAllowedMicrophone: false,
      callType: "videoCall",
    }),
  )
}

export const addCallDataHandler =
  ({ referenceId, adminDetail, callRoomId, callInitiator, pinnedUsers, callRoomAvailableUsers, peerId, userId }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      callReducerAction.addCallData({
        isAvailableCallRoom: true,
        callDetail: {
          callChannelType: "group",
          callRoomId,
          communicatorsDetail: [...callRoomAvailableUsers],
          myDetail: {
            peerId,
            userId,
          },
        },
      }),
    )
  }

export const createGroupMeetingHandler =
  (meetingDetail, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosMeetingInstance.post("/createGroupVideoCall", meetingDetail)
      await dispatch(
        callReducerAction.addIntialCallData({
          isAvailableCallRoom: true,
          isChanged: true,
          callDetail: {
            callChannelType: "group",
            callRoomId: data.callRoomId,
            communicatorsDetail: [],
            myDetail: { peerId: data.peerId, userId: meetingDetail.userId },
            referenceId: data.referenceId,
            adminDetail: data.adminDetail,
            callInitiator: {userId:data.callInitiator.userId},
          },
        }),
      )
      router.push("/video-call")
    } catch (error) {
      console.log(error)
    }
  }

export const addGroupCallConnectionRequiredPeers =
  ({ peerId, userId, userName }: { userName: string; userId: string; peerId: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(callReducerAction.addConnectionRequiredPeers({ peerId, userId }))
  }
export const joinGroupCallHandler =
  (details: {
    referenceId: string
    peerId: string
    userId: string
    adminId: string
    callRoomId: string
    callInitiator: string
    pinnedUsers: Array<{ userId: string }>
    callRoomAvailableUsers: Array<{ userId: string; peerId: string }>
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      callReducerAction.addIntialCallData({
        isAvailableCallRoom: true,
        isChanged: true,
        callDetail: {
          callChannelType: "group",
          callRoomId: details.callRoomId,
          communicatorsDetail: details.callRoomAvailableUsers,
          myDetail: { peerId: details.peerId, userId: details.userId },
          referenceId: details.referenceId,
        },
        connectionRequiredPeers: {
          allPeers: details.callRoomAvailableUsers,
          isInitialPeer: true,
        },
      }),
    )
  }

export const addGroupCallJoinRequestedUser =
  ({ joinRequestedUserDetail: { userName, userId } }) =>
  async (dispatch: AppDispatch) => {
    dispatch(callReducerAction.addJoinRequestedUser({ userName, userId }))
  }


  export const videoCallRequestHandler = (details) => async(dispatch: AppDispatch) =>  {
    dispatch(callReducerAction.addCallRequest(details))
}

export const videoCallRequestRemoveHandler = () => async(dispatch: AppDispatch) => {
    dispatch(callReducerAction.removeCallRequest())
}