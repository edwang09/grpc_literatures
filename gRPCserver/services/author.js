const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');

const GetAllAuthors = (_, callback) => {
    db.query("SELECT * FROM author", (err, res)=>{
        if (err) callback(err)
        else callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}
const GetAuthor = (call, callback) => {
    db.query(`SELECT * FROM author WHERE author_id = ${call.request.author_id}`, (err, res)=>{
        if (err) callback(err)
        else if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "sql: no rows in result set",
            })
        }
    })
}
const AddAuthor = (call, callback) => {
    db.query(`INSERT INTO author (author_name) VALUES ('${call.request.author_name}') `, (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, author_id: res.insertId})))
    })
}
const EditAuthor = (call, callback) => {
    db.query(`UPDATE author SET author_name = '${call.request.author_name}' WHERE author_id = '${call.request.author_id}'`, (err, res)=>{
        if (err) callback(err)
        else if (res.affectedRows>0){
            callback(null, JSON.parse(JSON.stringify(call.request)))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "No corresponding record found, did not update",
            })
        }
    })
}
const DeleteAuthor = (call, callback) => {
    db.query(`DELETE FROM author WHERE author_id = '${call.request.author_id}'`, (err, res)=>{
        if (err) callback(err)
        else if (res.affectedRows>0){
            callback(null, {})
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "No corresponding record found, did not delete",
            })
        }
    })
}



module.exports = {
    GetAllAuthors: GetAllAuthors,
    GetAuthor: GetAuthor,
    AddAuthor: AddAuthor,
    EditAuthor: EditAuthor,
    DeleteAuthor: DeleteAuthor
}