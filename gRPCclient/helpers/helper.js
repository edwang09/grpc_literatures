module.exports={
    SendJSON: (res, message)=>{

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.end(message);
    },
    SendTEXT: (res, message)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(message);
    }
}