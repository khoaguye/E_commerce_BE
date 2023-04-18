
// route for each e
import express from "express"
const router = express.Router();
import { updatePromo, addPromo, allPromotions, deletePromotion, getOneCode, getCodeByCategory } from "../Controller/PromotionCode.js";

router.get("/allPromotions", allPromotions)
router.delete("/deletePromotion", deletePromotion)
router.post("/addPromo", addPromo)
router.put("/updatePromo", updatePromo)
router.get("/getOneCode", getOneCode)
router.get("/getCodeByCategory", getCodeByCategory)


export default router