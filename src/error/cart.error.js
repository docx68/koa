export default {
    validator:{
        status:401,
        body:{
            code:10101,
            message:'数据校验不通过，请数据有误',
            result:""
        }
    },
    addCart:{
        status:401,
        body:{
            code:10101,
            message:'添加购物车失败，服务错误',
            result:""
        }
    },
    // 更新购物车失败
    updateCart:{
        status:401,
        body:{
            code:10102,
            message:'更新购物车失败，服务错误',
            result:""
        }
    }
}