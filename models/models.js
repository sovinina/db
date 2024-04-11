import db from "../db.js";
import {DataTypes} from "sequelize";

const People = db.define('people', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull: false},
    birthAge: {type: DataTypes.INTEGER, allowNull: false},
    phone:{type:DataTypes.STRING, unique:true}
})

const Work = db.define('work',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull: false},
    code:{type:DataTypes.INTEGER, unique: true, allowNull: false},
    pay:{type:DataTypes.INTEGER}
})

const User = db.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    role:{type:DataTypes.STRING, defaultValue: "USER"},
    login:{type:DataTypes.STRING,allowNull:true, unique: true},
    password:{type:DataTypes.STRING, allowNull:true}
})

Work.hasOne(People)
People.belongsTo(Work)

export default {
    People, Work, User
}