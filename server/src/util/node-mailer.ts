import nodeMailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

interface nodeMailerSendEmailerArguments {
  email: string
  html: string
  subject: string
  text: string
}

interface nodeMailerSendEmailerReturn {
  isValid: boolean
  isSendedEmail: boolean
  sendedMailInfo?: SMTPTransport.SentMessageInfo
  error?: string
}

export const nodeMailerSendEmailer = ({
  email,
  html,
  subject,
  text,
}: nodeMailerSendEmailerArguments): Promise<nodeMailerSendEmailerReturn> => {
  return new Promise((resolve, reject) => {
    const transporter = nodeMailer.createTransport({
      service: "email",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD,
      },
    })

    const mailContainer = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject,
      text,
      html,
    }

    transporter.sendMail(mailContainer, async (err, info) => {
      if (err != null)
        return resolve({
          isValid: true,
          isSendedEmail: true,
          sendedMailInfo: info,
        })
      return reject({ isValid: false, isSendedEmail: false })
    })
  })
}
