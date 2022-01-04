export default {
    userFormatErr:{
        status:400,
        body:{
            code:10000,
            message:'用户名或密码未输入',
            result:""
        }
    },

    userExist:{
        status:409,
        body:{
            code:10002,
            message:'用户已经存在',
            result:""
        }
    },

    userDB:{
        status:500,
        body:{
            code:10003,
            message:'服务器内部错误',
            result:""
        }
    },

    userNotExist:{
        status:410,
        body:{
            code:10005,
            message:'用户名不存在',
            result:""
        }
    },

    passwordError:{
        status:411,
        body:{
            code:10006,
            message:'密码错误',
            result:""
        }
    },

    // token 过期
    tokenExpired:{
        status:412,
        body:{
            code:10101,
            message:'token过期了',
            result:""
        }
    },

    // 无效token
    tokenError:{
        status:413,
        body:{
            code:10102,
            message:'token无效',
            result:""
        }
    },

    // 修改用户信息错误
    changeUserError:{
        status:414,
        body:{
            code:10202,
            message:'修改用户信息错误',
            result:""
        }
    },

    // 没有权限
    notAuth:{
        status:415,
        body:{
            code:10203,
            message:'没有权限',
            result:""
        }
    }
}