//项目配置文件，使用dotenv读取配置
import dotenv from 'dotenv'

dotenv.config()

let APP_PORT  =  process.env.APP_PORT
let jwt_secret = process.env.JWT_SECRET

let DB_CONFIG = {
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PWD,
    host:process.env.DB_HOST,
    dialect:process.env.DB_TYPE,
    prefix:process.env.DB_PREFIX
}

export {APP_PORT,DB_CONFIG,jwt_secret}