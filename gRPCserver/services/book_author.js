const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const {ValidateCallback, ValidateRequest} = require('../helper/helper');
/**
 * @callback requestCallback
 * @param {Object} error
 * @param {Object} response
 */



/**
 * Get all books and authors relationship
 * @param {Object} _ 
 * @param {requestCallback} callback
 */
const GetAllBookAuthors = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id`, (err, res)=>{
        if (err) callback(err)
        else callback(null, {book_authors : JSON.parse(JSON.stringify(res))})
    })
}
/**
 * Get one book and author relationship by id with book and author names
 * @param {Object} call
 * @param {requestCallback} callback
 */
const GetBookAuthor = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id
    WHERE book_author_id = ?`,[call.request.book_author_id], (err, res)=>{
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
 * Associate an book to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const AddBookAuthor = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`INSERT INTO book_author (book_id, author_id) 
    VALUES (?, ?) `,[call.request.book_id, call.request.author_id], (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, book_author_id: res.insertId})))
    })
}
/**
 * Edit association of an book to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const EditBookAuthor = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`UPDATE book_author 
    SET book_id = ?, author_id = ? 
    WHERE book_author_id = ?`
    ,[call.request.book_id, call.request.author_id, call.request.book_author_id], (err, res)=>{
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
/**
 * Remove association of an book to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const DeleteBookAuthor = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`DELETE FROM book_author WHERE book_author_id = ?`,[call.request.book_author_id], (err, res)=>{
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
    GetAllBookAuthors,
    GetBookAuthor,
    AddBookAuthor,
    EditBookAuthor,
    DeleteBookAuthor
}