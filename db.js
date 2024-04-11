import {Sequelize} from 'sequelize'
import config from "./config.js";
export default new Sequelize(
        config.DB_NAME,
        config.DB_USER,
        config.DB_PASSWORD,
        {
            dialect: config.DB_DIALECT,
            host: config.DB_HOST,
            port: config.DB_PORT
        }
    )

