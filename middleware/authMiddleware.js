import config from "../config.js";
import jwt from "jsonwebtoken";

export default function (req,res,next){
    try{
        const token = req.headers.authorization
        if(!token){
            return res.json('Вы не авторизованы')
        }
        req.user = jwt.verify(token, config.SECRET_KEY)
        next()
    }
    catch (e) {
        res.json('Токен не валидный')
    }
}