exports.handle = function (req, res, grpcclient, reqUrl) {
    grpcclient.TestgRPC({body: "hello world"}, function(err, response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        console.log("got response from server")
        res.end(response.body);
    });
};