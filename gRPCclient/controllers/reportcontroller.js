
const {SendJSON, SendTEXT} = require("../helpers/helper");

exports.handle = function (req, res, grpcclient, reqUrl) {
    switch (reqUrl.pathname) {
        case "/reports/mostawardedauthor":
            grpcclient.MostAwardedAuthor({}, function(err, response) {
                if(err){
                    SendTEXT(res, err.message)
                }else{
                    SendJSON(res, response)
                }
            });
            break;
        case "/reports/mostawardedbook":
            let page = 1;
            if (reqUrl.searchParams.get('page')) page = reqUrl.searchParams.get('page');
            grpcclient.MostAwardedBook({page:page}, function(err, response) {
                if(err){
                    SendTEXT(res, err.message)
                }else{
                    SendJSON(res, response)
                }
            });
            break;
        case "/reports/mostgrantedaward":
            grpcclient.MostGrantedAward({}, function(err, response) {
                if(err){
                    SendTEXT(res, err.message)
                }else{
                    SendJSON(res, response)
                }
            });
            break;
        default:
            break;
    }
};