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
    }
}