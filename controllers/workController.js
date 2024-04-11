import models from "../models/models.js"
const {Work} = models

class WorkController{
    async create(req, res){
        try {
            const {title, code, pay} = req.body
            const curCode = await Work.findOne({where:{code}})
            if(!title){
                return res.status(401).json('Введите название')
            }
            if(curCode){
                return res.status(409).json('Работа с таким кодом уже существует')
            }
            await Work.create({title, code, pay})
            res.json('Работа добавлена')
        }
        catch (e){
            res.json(e)
        }
    }

    async get(req, res){
        try{
            const {code} = req.query
            if(!code){
                const work = await Work.findAndCountAll()
                return res.json(work)
            }
            const work = await Work.findAndCountAll({where:{code}})
            if(work.count>0){
                return res.json(work)
            }
            return res.json('Работы не найдены')
        }
        catch(e){
            res.json(e)
        }
    }

    async delete(req, res){
        const {id} = req.params
        const work = await Work.findOne({where:{id}})
        if(!work){
            return res.json('Работа не найдена')
        }
        work.destroy()
        res.json('Работа стёрта >:)')
    }
    async update(req, res){
        try{
            const {id} = req.params
            const  {title, code, pay} = req.body
            const work = await Work.findByPk(id)
            if(!work){
                return res.json("такой работки нет, уходите")
            }
            await work.update( {title, code, pay})
            res.json('ура обновление подъехало')
        }
        catch (e){
            res.json(e)
        }
    }
}

export default new WorkController()