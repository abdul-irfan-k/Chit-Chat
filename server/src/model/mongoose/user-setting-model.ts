import mongoose, { Types, Schema, Document, model } from "mongoose"

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    notificationAndSoundSetting: {
      privateChat: {
        notification: { type: String, default: true },
        messagePreview: { type: Boolean, default: true },
      },
      group: {
        notification: { type: String, default: true },
        messagePreview: { type: Boolean, default: true },
      },
    },
    generalSetting: {
      theme: { type: String },
      backgroundTheme: { themeUrl: { type: String } },
      keyboardSetting: { sendByEnter: { type: Boolean, default: true }, sendByControlPlusEnter: { type: Boolean } },
      time: { timeFormat: { type: String, default: "12" } },
    },
  },
  {
    timestamps: true,
  },
)

interface settingSchemaInterface {
  userId?: Types.ObjectId | undefined
  notificationAndSoundSetting?:
    | {
        privateChat?:
          | {
              notification: string
              messagePreview: boolean
            }
          | undefined
        group?:
          | {
              notification: string
              messagePreview: boolean
            }
          | undefined
      }
    | undefined

  generalSetting?:
    | {
        theme?: string | undefined
        backgroundTheme?:
          | {
              themeUrl?: string | undefined
            }
          | undefined
        keyboardSetting?:
          | {
              sendByEnter: boolean
              sendByControlPlusEnter?: boolean | undefined
            }
          | undefined
        time?:
          | {
              timeFormat: string
            }
          | undefined
      }
    | undefined
}

export interface SettingDocument extends settingSchemaInterface, Document {}
const UserSettingModel = model<SettingDocument>("userSetting", settingSchema)
export default UserSettingModel
