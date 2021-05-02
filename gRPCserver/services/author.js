const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllAuthors = (call, callback)=>{
    db.query("SELECT * FROM author", (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        var normalObj = Object.assign({}, res);
        console.log(typeof res);
        callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}

const GetAuthor = (call, callback)=>{
    console.log(call.request.author_id)
    db.query(`SELECT * FROM author WHERE author_id = ${call.request.author_id}`, (err, res)=>{
        if (err) throw err;
        if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "author_id not found",
            })
        }
    })
}
const AddAuthor = (call, callback)=>{
    console.log(call.request.author_name)
    db.query(`INSERT INTO author (author_name) VALUES (${call.request.author_name}) `, (err, res)=>{
        if (err) throw err;
        
        console.log()
    })
}
const EditAuthor = (call, callback)=>{
    callback(null, {body : "from gRPC server: " + call.request.body})
}
const DeleteAuthor = (call, callback)=>{
    callback(null, {body : "from gRPC server: " + call.request.body})
}



module.exports = {
    GetAllAuthors: GetAllAuthors,
    GetAuthor: GetAuthor,
    AddAuthor: AddAuthor,
    EditAuthor: EditAuthor,
    DeleteAuthor: DeleteAuthor
}