import {APP_PORT} from './src/config/app.config.js'
import app from './src/app/app.js'

console.log(APP_PORT);

app.listen(APP_PORT,()=>{
    console.log(`server is running on http://localhost:${APP_PORT }`)
})
