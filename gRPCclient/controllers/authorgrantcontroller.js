
const {SendJSON, SendTEXT} = require("../helpers/helper");

exports.handle = function (req, res, grpcclient, reqUrl) {

    var body ='';
    req.on('data', function (data) {
        body += data;
    });
    switch (req.method) {
        case "GET":
            if (reqUrl.searchParams.get('id')){
                grpcclient.GetAuthorGrant({author_grant_id: reqUrl.searchParams.get('id')}, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            }else{
                grpcclient.GetAllAuthorGrants({}, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            }
            break;
        case "POST":
            req.on('end', function () {
                var post = JSON.parse(body);
                grpcclient.AddAuthorGrant(post, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            });
            
            break;
        
        case "PUT":
            req.on('end', function () {
                var post = JSON.parse(body);
                grpcclient.EditAuthorGrant(post, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            });
            break;
        case "DELETE":
            req.on('end', function () {
                var post = JSON.parse(body);
                grpcclient.DeleteAuthorGrant(post, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            });
            break;
        
        default:
            break;
    }
};