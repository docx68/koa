export default {
    uploadsError:{
        status:401,
        body:{
            code:10100,
            message:'文件上传失败',
            result:""
        }
    },

    // 上传不支持的文件格式
    unSupportedType:{
        status:402,
        body:{
            code:10102,
            message:'不支持的文件格式',
            result:""
        }
    },

    // 上传校验出错
    validateError:{
        status:402,
        body:{
            code:10103,
            message:'上传格式有误',
            result:""
        }
    },
    // 上传校验出错
    createError:{
        status:402,
        body:{
            code:101034,
            message:'商品添加失败',
            result:""
        }
    }
}