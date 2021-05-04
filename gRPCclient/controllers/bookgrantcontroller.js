const {SendJSON, SendTEXT} = require("../helpers/helper");


exports.handle = function (req, res, grpcclient, reqUrl) {

    var body ='';
    req.on('data', function (data) {
        body += data;
    });
    switch (req.method) {
        case "GET":
            if (reqUrl.searchParams.get('id')){
                grpcclient.GetBookGrant({book_grant_id: reqUrl.searchParams.get('id')}, function(err, response) {
                    if(err){
                        SendTEXT(res, err.message)
                    }else{
                        SendJSON(res, response)
                    }
                });
            }else{
                grpcclient.GetAllBookGrants({}, function(err, response) {
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
                console.log(post);
                grpcclient.AddBookGrant(post, function(err, response) {
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
                grpcclient.EditBookGrant(post, function(err, response) {
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
                grpcclient.DeleteBookGrant(post, function(err, response) {
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