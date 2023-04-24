import express from "express";
import cors from "cors"
import { login, logout, registerUser, testget, deleteUser, updateUser, getAdmin, updateProfile } from "../Controller/User.js";

import {middlewareController} from "../Controller/MiddlewareController.js";

const router = express.Router();
// const allowedOrigins = ['https://e-commerce-fe-ynjo.vercel.app/', 'http://e-commerce-fe-ynjo.vercel.app/'];
// const corsOptions ={
//     origin:allowedOrigins, 
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// router.use(cors(corsOptions));
// router.use(
//     cors()
// ); 
router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/testGet", testget)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id", updateUser)
router.get("/getAdmin", middlewareController.verifyTokenAndAdminAuth, getAdmin)
router.put("/updateProfie", middlewareController.verifyToken, updateProfile)

export default router