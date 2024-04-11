import models from "../models/models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config.js";
const {User} = models

class UserController{
    async login(req,res){
        const {login,password} = req.body
        if(!login || !password){
            return res.status(401).json('Вы не указали логин или пароль')
        }
        const user = await User.findOne({where:{login}})
        if(!user){
            return res.status(404).json('Такого пользователя не существует')
        }
        const validPass = bcrypt.compareSync(password, user.password)
        if(!validPass){
            return res.status(401).json('Извините, но пароль неверный')
        }
        const token = jwt.sign({id:user.id, login:user.login, role:user.role}, config.SECRET_KEY,{
            expiresIn: '24h'
        })
        res.status(200).json(token)
        // res.json('Вы успешно вошли на сайт')
    }
    async registration(req,res){
        const {login,password} = req.body
        if(!login || !password){
            return res.status(401).json('Вы не указали логин или пароль')
        }
        const user = await User.findOne({where:{login}})
        if(user){
            return res.status(409).json('Пользователь с таким логином уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser  =  await User.create({login, password:hashPassword})
        const token = jwt.sign({id:newUser.id, login:newUser.login, role:newUser.role}, config.SECRET_KEY,{
            expiresIn: '24h'
        })
        res.json(token)
        //res.json('Вы успешно зарегистрировались')
    }

}

export default new UserController()