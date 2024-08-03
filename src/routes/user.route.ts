import express from "express";
import UserController from '../controllers/user.controller'

const router = express.Router();

router.get("/fetch", UserController.fetchAll);
router.get("/fetch/:fid", UserController.fetchUserByFid);
router.post("/create", UserController.createUser);
router.put("/update/:fid", UserController.updateUser);



export default router;