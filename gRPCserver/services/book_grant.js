const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllBookGrants = (call, callback)=>{
    db.query(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id`, (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        callback(null, {book_grants : JSON.parse(JSON.stringify(res))})
    })
}

const GetBookGrant = (call, callback)=>{
    console.log(call.request)
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
        if (err) throw err;
        if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "book_grant_id not found",
            })
        }
    })
}
const AddBookGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`INSERT INTO book_grant (book_id, award_id) 
    VALUES ('${call.request.book_id}','${call.request.award_id}') `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, book_grant_id: res.insertId})))
    })
}
const EditBookGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`UPDATE book_grant 
    SET book_id = '${call.request.book_id}',
    award_id = '${call.request.award_id}' 
    WHERE book_grant_id = '${call.request.book_grant_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteBookGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM book_grant WHERE book_grant_id = '${call.request.book_grant_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllBookGrants: GetAllBookGrants,
    GetBookGrant: GetBookGrant,
    AddBookGrant: AddBookGrant,
    EditBookGrant: EditBookGrant,
    DeleteBookGrant: DeleteBookGrant
}