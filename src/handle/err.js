let error = (err,ctx) => {
    if(!isNaN(err.status) && parseInt(err.status)){
        ctx.response.status = err.status
    }
    ctx.response.body = err.body
}

export default error