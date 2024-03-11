var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodeMailer from "nodemailer";
export const nodeMailerSendEmailer = ({ email, html, subject, text, }) => {
    return new Promise((resolve, reject) => {
        const transporter = nodeMailer.createTransport({
            service: "email",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_EMAIL_PASSWORD,
            },
        });
        const mailContainer = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject,
            text,
            html,
        };
        transporter.sendMail(mailContainer, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err != null)
                return resolve({
                    isValid: true,
                    isSendedEmail: true,
                    sendedMailInfo: info,
                });
            return reject({ isValid: false, isSendedEmail: false });
        }));
    });
};
