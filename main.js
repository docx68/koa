import Env from './src/config/config.default.js'
import app from './src/app/app_use.js'

app.listen(Env.APP_PORT,()=>{
    console.log(`server is running on http://localhost:${Env.APP_PORT }`)
})

