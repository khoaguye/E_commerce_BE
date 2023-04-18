import express from "express"
import { allProduct,productContent, productDetail,category, productCategory,searchProduct, addProduct,updateProduct,deleteProduct} from "../Controller/Product.js"
const router = express.Router();

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