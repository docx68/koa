export default {
    addAddr:{
        status:401,
        body:{
            code:10101,
            message:'添加地址失败，服务错误',
            result:""
        }
    },

    find:{
        status:401,
        body:{
            code:10102,
            message:"未查询到地址",
            result:""
        }
    }
}