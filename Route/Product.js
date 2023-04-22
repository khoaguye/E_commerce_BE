import express from "express"
import cors from "cors"
import { allProduct,productContent, productDetail,category, productCategory,searchProduct, addProduct,updateProduct,deleteProduct} from "../Controller/Product.js"
const router = express.Router();
// const allowedOrigins = ['https://e-commerce-fe-ynjo.vercel.app/', 'http://e-commerce-fe-ynjo.vercel.app/'];
// const corsOptions ={
//     origin:allowedOrigins, 
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// router.use(cors(corsOptions));

//router.get("/productContent", productContent)
router.get("/allProduct", allProduct)
router.get("/productContent", productContent)
router.get("/productDetail/:id", productDetail)
router.get("/category", category)
router.get("/productCategory/:category", productCategory)
router.get("/searchProduct/:product", searchProduct)
router.post("/addProduct", addProduct)
router.put("/updateProduct", updateProduct)
router.delete("/deleteProduct", deleteProduct)



export default router