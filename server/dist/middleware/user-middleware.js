var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TOKENEXPIRED, TOKENNOTFOUND } from "../constants/constants.js";
import { verifyJwtTokenHandler } from "../util/jwt.js";
export const checkisLogedInMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authToken, refreshToken } = req.cookies || {};
        if (!authToken || !refreshToken)
            return res.status(400).json({ isLogedin: false, errorType: TOKENNOTFOUND });
        const isCutomAuth = (authToken === null || authToken === void 0 ? void 0 : authToken.length) < 500;
        if (authToken && isCutomAuth) {
            yield verifyJwtTokenHandler({ req, token: authToken, tokenType: "authToken" });
        }
        else {
            console.log("not cutom auth");
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ isLogedin: false, errorType: TOKENEXPIRED });
    }
});
