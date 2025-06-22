import { Router } from "express";
import { addToHistory, getUserHistory, login, register, getUserFromToken, clearUserHistory } from "../controllers/user.controller.js";



const router = Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").get(getUserHistory)
router.route("/get_user_from_token").get(getUserFromToken);
router.route("/clear_activity").delete(clearUserHistory);


export default router;