import {Router} from "express";
import peopleRouter from "./peopleRouter.js";
import workRouter from "./workRouter.js";
import userRouter from "./userRouter.js";


const router = Router()

router.use('/people', peopleRouter)
router.use('/work', workRouter)
router.use('/user', userRouter)
export default router