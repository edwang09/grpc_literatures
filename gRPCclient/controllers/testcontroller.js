const {SendJSON, SendTEXT} = require("../helpers/helper");
exports.handle = function (req, res, grpcclient, reqUrl) {
    grpcclient.TestgRPC({body: "hello world"}, function(err, response) {
        if(err){
            SendTEXT(res, err.message)
        }else{
            SendJSON(res, response)
        }
    });
};