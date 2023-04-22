import express from "express";
import productRouter from "./Route/Product.js"
import userInfor from "./Route/User.js"
import orderInfor from "./Route/Order.js"
import promoteCode from "./Route/PromotionCode.js"
import cors from "cors" //npm install cors
import cookieParser from "cookie-parser"//npm install cookie-parser
const app = express()
//const cors = require('cors');
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// const corsOptions ={
//     origin:'*', 
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
// app.use(
//    cors()
// ); 
const allowedOrigins = ['https://e-commerce-fe-ynjo.vercel.app/', 'http://e-commerce-fe-ynjo.vercel.app/'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));
app.use(cookieParser()) 
app.use("/api/product", productRouter)
app.use("/api/user", userInfor)
app.use("/api/order", orderInfor)
app.use("/api/promote", promoteCode)

app.listen(8800,()=>{
    console.log('connected')
})