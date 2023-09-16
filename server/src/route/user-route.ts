import express from 'express'
import { loginUserHandler, signUpUserHandler } from '../controller/user-controller.js'
const router = express.Router()


router.post('/signUpUser',signUpUserHandler)
router.post('/signUpUser',loginUserHandler)
router.post('/verifyIsLogedIn')

export default router