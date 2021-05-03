const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllAuthors = (call, callback)=>{
    db.query("SELECT * FROM author", (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
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
    db.query(`INSERT INTO author (author_name) VALUES ('${call.request.author_name}') `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, author_id: res.insertId})))
    })
}
const EditAuthor = (call, callback)=>{
    console.log(call.request.author_name)
    db.query(`UPDATE author SET author_name = '${call.request.author_name}' WHERE author_id = '${call.request.author_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteAuthor = (call, callback)=>{
    console.log(call.request.author_id)
    db.query(`DELETE FROM author WHERE author_id = '${call.request.author_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllAuthors: GetAllAuthors,
    GetAuthor: GetAuthor,
    AddAuthor: AddAuthor,
    EditAuthor: EditAuthor,
    DeleteAuthor: DeleteAuthor
}