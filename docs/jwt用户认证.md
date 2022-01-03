## jwt用户认证

1、用户登录成功颁发令牌

jwt : jsonwebtoken 包含三个部分

- header:头部
- payload：载荷
- signature：签名

安装：jsonwebtoken

```
npm install jsonwebtoken
```

导入

```
import jsonwebtoken from "jsonwebtoken";
```

payload中记录字段：id、user_name、is_admin

.env配置

```
//jwt
JWT_SECRET = zdf
```

/src/config/app.config.js

```
let jwt_secret = process.env.JWT_SECRET //导出
```

颁发令牌

```
//jwt.js
import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../config/app.config.js'

function jwt({...param}) {
    try {
        let token = jsonwebtoken.sign(param, jwt_secret, { expiresIn: '1d' });
        return token;
    } catch (e) {
        console.error(e)
    }
}

export default jwt;

//user.controller.js
import jwt from "../common/jwt.js";
let token = jwt(res)
```

