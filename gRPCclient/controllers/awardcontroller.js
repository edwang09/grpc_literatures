


exports.handle = function (req, res, grpcclient, reqUrl) {

    // const reqUrl = new URL(req.url);
    switch (req.method) {
        case "GET":
            if (reqUrl.searchParams.get('id')){
                grpcclient.GetAward({award_id: reqUrl.searchParams.get('id')}, function(err, response) {
                    if(err){
                        console.log(err)
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(err.message);

                    }else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        console.log("got response from server")
                        console.log(response)
                        res.end(JSON.stringify(response));

                    }
                });
            }else{
                grpcclient.GetAllAwards({}, function(err, response) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log("got response from server")
                    console.log(response)
                    res.end(JSON.stringify(response));
                });
            }
            break;
        case "POST":
            var body ='';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = JSON.parse(body);
                console.log(post);
                grpcclient.AddAward(post, function(err, response) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log("got response from server")
                    console.log(response)
                    res.end(JSON.stringify(response));
                });
            });
            
            break;
        
        case "PUT":
            var body ='';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = JSON.parse(body);
                grpcclient.EditAward(post, function(err, response) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log("got response from server")
                    console.log(response)
                    res.end(JSON.stringify(response));
                });
            });
            break;
        case "DELETE":
            var body ='';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = JSON.parse(body);
                grpcclient.DeleteAward(post, function(err, response) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    console.log("got response from server")
                    console.log(response)
                    res.end(JSON.stringify(response));
                });
            });
            break;
        
        default:
            break;
    }
};