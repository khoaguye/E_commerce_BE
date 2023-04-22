
import express from "express"
import cors from "cors"
import { allOrder, historyOrder, createOrder, updateOrder, deleteOrder, getOrderByUid } from "../Controller/Order.js";
const router = express.Router();
// const allowedOrigins = ['https://e-commerce-fe-ynjo.vercel.app/', 'http://e-commerce-fe-ynjo.vercel.app/'];
// const corsOptions ={
//     origin:allowedOrigins, 
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// router.use(cors(corsOptions));

router.get("/allOrder", allOrder)
router.get("/historyOrder", historyOrder)
router.post("/orderByUid", getOrderByUid)
router.post("/createOrder", createOrder)
router.put("/updateOrder", updateOrder)
router.delete("/deleteOrder", deleteOrder)


export default router