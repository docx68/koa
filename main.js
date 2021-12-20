import {APP_PORT} from './src/config/config.default.js'
import app from './src/app/app_use.js'

console.log(APP_PORT);

app.listen(APP_PORT,()=>{
    console.log(`server is running on http://localhost:${APP_PORT }`)
})

