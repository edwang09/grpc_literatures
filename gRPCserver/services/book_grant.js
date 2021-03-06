const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const {ValidateCallback, ValidateRequest} = require('../helper/helper');

/**
 * @callback requestCallback
 * @param {Object} error
 * @param {Object} response
 */



/**
 * Get all awards granted to book with award and book names
 * @param {Object} _ 
 * @param {requestCallback} callback
 */
const GetAllBookGrants = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
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
/**
 * Get one awards granted to book by id with award and book names
 * @param {Object} call
 * @param {requestCallback} callback
 */
const GetBookGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id
    WHERE book_grant_id = ?`,[call.request.book_grant_id], (err, res)=>{
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
/**
 * Associate an award to a book
 * @param {Object} call
 * @param {requestCallback} callback
 */
const AddBookGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`INSERT INTO book_grant (book_id, award_id) 
    VALUES (?, ?) `,[call.request.book_id, call.request.award_id], (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, book_grant_id: res.insertId})))
    })
}
/**
 * Edit association of an award to a book
 * @param {Object} call
 * @param {requestCallback} callback
 */
const EditBookGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`UPDATE book_grant 
    SET book_id = ?, award_id = ? 
    WHERE book_grant_id = ?`,[call.request.book_id, call.request.award_id, call.request.book_grant_id], (err, res)=>{
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
/**
 * Remove association of an award to a book
 * @param {Object} call
 * @param {requestCallback} callback
 */
const DeleteBookGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`DELETE FROM book_grant WHERE book_grant_id = ?`,[call.request.book_grant_id], (err, res)=>{
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
    GetAllBookGrants,
    GetBookGrant,
    AddBookGrant,
    EditBookGrant,
    DeleteBookGrant
}