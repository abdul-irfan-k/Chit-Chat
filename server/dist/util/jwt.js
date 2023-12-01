var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export const createJwtTokenHandler = ({ _id, email, expiresIn, tokenType, }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const tokenSecret = tokenType == "authToken" ? process.env.JWT_AUTH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
        jwt.sign({ email, _id }, tokenSecret || "", { expiresIn }, (error, token) => {
            if (typeof token === "string")
                resolve({ isValid: true, token });
            if (typeof error !== "undefined")
                reject({ isValid: false, error: error === null || error === void 0 ? void 0 : error.name });
        });
    });
});
export const verifyJwtTokenHandler = ({ req, token, tokenType, }) => {
    return new Promise((resolve, reject) => {
        const tokenSecret = tokenType == "authToken" ? process.env.JWT_AUTH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
        jwt.verify(token, tokenSecret || "", (err, decoded) => {
            if (!err && decoded && typeof decoded !== "string") {
                req.user = { _id: decoded._id, email: decoded.email };
                return resolve({ isValid: true });
            }
            if (err) {
                reject({ isValid: false, error: err });
            }
            return reject({ isValid: false, error: "not found" });
        });
    });
};
