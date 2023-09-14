import express from 'express'
import { loginUserHandler, signUpUserHandler } from '../controller/user-controller'
const router = express.Router()


router.post('/signUpUser',signUpUserHandler)
router.post('/signUpUser',loginUserHandler)

export default router