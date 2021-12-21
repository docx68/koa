//数据库连接，使用sequelize

import Sequelize from 'sequelize';
import { DB_CONFIG as db } from '../config/app.config.js';

let db_prefix = db.prefix

const db_connect = new Sequelize(db.database,db.username,db.password,{
    host:db.DB_HOST,
    dialect: db.dialect
})

export { db_connect,db_prefix }