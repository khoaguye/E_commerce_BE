
import express from "express"
import { allOrder, historyOrder, createOrder, updateOrder, deleteOrder, getOrderByUid } from "../Controller/Order.js";
const router = express.Router();

router.get("/allOrder", allOrder)
router.get("/historyOrder", historyOrder)
router.post("/orderByUid", getOrderByUid)
router.post("/createOrder", createOrder)
router.put("/updateOrder", updateOrder)
router.delete("/deleteOrder", deleteOrder)


export default router