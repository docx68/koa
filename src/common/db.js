// 数据库连接，使用sequelize
import Sequelize from 'sequelize';

// 导入数据库配置文件
import { DB_CONFIG as db } from '../app/config.js';
let db_prefix = db.prefix

// 传递参数实例化连接
const db_connect = new Sequelize(db.database,db.username,db.password,{
    host:db.DB_HOST,
    dialect: db.dialect
})

// 测试连接是否成功
try {
    await db_connect.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
// 导出
export { db_connect,db_prefix }