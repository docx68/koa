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
    }
}