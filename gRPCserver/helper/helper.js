module.exports={
    ValidateRequest: (call)=>{
        return call.request !== undefined
    },
    ValidateCallback: (cb)=>{
        return typeof cb === 'function'
    }
}