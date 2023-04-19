
import jwt from "jsonwebtoken" 
export const middlewareController = {
    verifyToken: (req, res, next) =>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, "secretkey", (err,user) =>{
                if(err){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        }
        else{
            res.status(401).json("You are not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req,res, () =>{
            if(req.user.role === "admin"){
                next()
            }
            else{
                res.status(403).json("You are not allowed at this site")
            }
        })
    }
}