


exports.handle = function (req, res, grpcclient, reqUrl) {

    // const reqUrl = new URL(req.url);
    switch (reqUrl.pathname) {
        case "/reports/mostawardedauthor":
            grpcclient.MostAwardedAuthor({}, function(err, response) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/json');
                console.log("got response from server")
                console.log(response)
                res.end(JSON.stringify(response));
            });
            break;
        case "/reports/mostawardedbook":
            let page = 1;
            if (reqUrl.searchParams.get('page')) page = reqUrl.searchParams.get('page');
            grpcclient.MostAwardedBook({page:page}, function(err, response) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/json');
                console.log("got response from server")
                console.log(response)
                res.end(JSON.stringify(response));
            });
            break;
        case "/reports/mostgrantedaward":
            grpcclient.MostGrantedAward({}, function(err, response) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/json');
                console.log("got response from server")
                console.log(response)
                res.end(JSON.stringify(response));
            });
            break;
        default:
            break;
    }
};