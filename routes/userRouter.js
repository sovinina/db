import {Router} from "express";
import userController from "../controllers/userController.js";
const router = Router()


router.post('/reg',userController.registration)
router.post('/login',userController.login)
export default router