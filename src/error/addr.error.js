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
    },

    // 更新失败
    update:{
        status:401,
        body:{
            code:10103,
            message:"数据未更新，请检查id等信息",
            result:""
        }
    },

    // 设置默认失败
    is_default:{
        status:401,
        body:{
            code:10104,
            message:"设置默认失败，请检查数据",
            result:""
        }
    },

    // 设置默认失败
    delete:{
        status:401,
        body:{
            code:10104,
            message:"删除地址失败，请检查数据",
            result:""
        }
    }
}