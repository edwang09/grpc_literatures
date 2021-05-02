module.exports = {
    TestgRPC: (call, callback)=>{
        callback(null, {body : "from gRPC server: " + call.request.body})
      }
}