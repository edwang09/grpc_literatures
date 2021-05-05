const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllBookGrants = (_, callback)=>{
    db.query(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id`, (err, res)=>{
        if (err) callback(err)
        else callback(null, {book_grants : JSON.parse(JSON.stringify(res))})
    })
}

const GetBookGrant = (call, callback)=>{
    db.query(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id
    WHERE book_grant_id = ${call.request.book_grant_id}`, (err, res)=>{
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
const AddBookGrant = (call, callback)=>{
    db.query(`INSERT INTO book_grant (book_id, award_id) 
    VALUES ('${call.request.book_id}','${call.request.award_id}') `, (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, book_grant_id: res.insertId})))
    })
}
const EditBookGrant = (call, callback)=>{
    db.query(`UPDATE book_grant 
    SET book_id = '${call.request.book_id}',
    award_id = '${call.request.award_id}' 
    WHERE book_grant_id = '${call.request.book_grant_id}'`, (err, res)=>{
        if (err) callback(err)
        else if (res.affectedRows>0){
            callback(null, JSON.parse(JSON.stringify(call.request)))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "No corresponding record found, did not update",
            })
        }    })
}
const DeleteBookGrant = (call, callback)=>{
    db.query(`DELETE FROM book_grant WHERE book_grant_id = '${call.request.book_grant_id}'`, (err, res)=>{
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
    GetAllBookGrants: GetAllBookGrants,
    GetBookGrant: GetBookGrant,
    AddBookGrant: AddBookGrant,
    EditBookGrant: EditBookGrant,
    DeleteBookGrant: DeleteBookGrant
}