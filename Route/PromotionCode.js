
// route for each e
import express from "express"
const router = express.Router();
import { updatePromo, addPromo, allPromotions, deletePromotion, getOneCode, getCodeByCategory } from "../Controller/PromotionCode.js";
const allowedOrigins = ['https://e-commerce-fe-ynjo.vercel.app/', 'http://e-commerce-fe-ynjo.vercel.app/'];
const corsOptions ={
    origin:allowedOrigins, 
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));
router.get("/allPromotions", allPromotions)
router.delete("/deletePromotion", deletePromotion)
router.post("/addPromo", addPromo)
router.put("/updatePromo", updatePromo)
router.get("/getOneCode", getOneCode)
router.get("/getCodeByCategory", getCodeByCategory)


export default router