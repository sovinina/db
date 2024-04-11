import models from "../models/models.js"
const {People} = models

class PeopleController{
    async create(req, res){
        try {
            const {name, birthAge, phone, workId} = req.body
            const curPhone = await People.findOne({where:{phone}})
            if(!name){
                return res.status(401).json('Введите имя')
            }
            if(curPhone){
                return res.status(409).json('Пользователь с таким номером телефона уже существует')
            }
            await People.create({name, birthAge, phone, workId})
            res.json('Пользователь добавлен')
        }
        catch (e){
            res.json(e)
        }
    }

    async get(req, res){
        try{
            const {name} = req.query
            if(!name){
                const people = await People.findAndCountAll()
                return res.json(people)
            }
            const people = await People.findAndCountAll({where:{name}})
            if(people.count>0){
                return res.json(people)
            }
            return res.json('Пользователи не найдены')
        }
        catch(e){
            res.json(e)
        }
    }

    async delete(req, res){
        const {id} = req.params
        const people = await People.findOne({where:{id}})
        if(!people){
            return res.json('Пользователь не найден')
        }
        people.destroy()
        res.json('Пользователь стёрт >:)')
    }
    async update(req, res){
        try{
            const {id} = req.params
            const {name, birthAge, phone} = req.body
            const people = await People.findByPk(id)
            if(!people){
                return res.json("такого человечка нет, уходите")
            }
            await people.update({name, birthAge, phone})
            res.json('ура обновление подъехало')
        }
        catch (e){
            res.json(e)
        }
    }
}

export default new PeopleController()