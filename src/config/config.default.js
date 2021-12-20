import dotenv from 'dotenv'

dotenv.config()

let Env  =  {
    APP_PORT:process.env.APP_PORT
};

//console.log(process.env.APP_PORT)

export default Env