import {Router} from "express";
import workController from "../controllers/workController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = Router()

router.get('/',workController.get)
router.post('/',authMiddleware,checkRoleMiddleware('ADMIN'),workController.create)
router.delete('/',authMiddleware,checkRoleMiddleware('ADMIN'),workController.delete)
router.patch('/',authMiddleware,checkRoleMiddleware('ADMIN'),workController.update)

export default router