import {Router} from "express";
import peopleController from "../controllers/peopleController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router()


router.get('/',peopleController.get)
router.post('/',authMiddleware, peopleController.create)
router.delete('/:id',authMiddleware,checkRoleMiddleware('ADMIN'), peopleController.delete)
router.patch('/',authMiddleware,checkRoleMiddleware('ADMIN'), peopleController.update)
export default router