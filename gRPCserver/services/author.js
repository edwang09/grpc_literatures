const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const {ValidateCallback, ValidateRequest} = require('../helper/helper');
/**
 * @callback requestCallback
 * @param {Object} error
 * @param {Object} response
 */



/**
 * Get all authors with author id and author names
 * @param {Object} _ 
 * @param {requestCallback} callback
 */
const GetAllAuthors = (_, callback) => {
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query("SELECT * FROM author", (err, res)=>{
        if (err) callback(err)
        else callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}

/**
 * Get one authors by id with author id and author names
 * @param {Object} call 
 * @param {requestCallback} callback
 */
const GetAuthorById = (call, callback) => {
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query("SELECT * FROM author WHERE author_id = ?", [call.request.author_id], (err, res)=>{
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
 * Search  authors by name 
 * @param {Object} call 
 * @param {requestCallback} callback
 */
const SearchAuthorByName = (call, callback) => {
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid Callback Function")
    db.query(`SELECT * FROM author WHERE author_name like ?`,["%"+call.request.author_name+"%"], (err, res)=>{
        if (err) callback(err)
        else callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}


/**
 * Create a new author with name, returns author id and author name 
 * @param {Object} call 
 * @param {requestCallback} callback
 */
const AddAuthor = (call, callback) => {
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid Callback Function")
    db.query(`INSERT INTO author (author_name) VALUES (?) `,[call.request.author_name], (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, author_id: res.insertId})))
    })
}

/**
 * Edit an existing author name, returns author id and author name 
 * @param {Object} call 
 * @param {requestCallback} callback
 */
const EditAuthor = (call, callback) => {
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid Callback Function")
    db.query(`UPDATE author SET author_name = ? 
    WHERE author_id = ?`
    ,[call.request.author_name, call.request.author_id]
    ,(err, res)=>{
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
 * Remove an existing author
 * @param {Object} call 
 * @param {requestCallback} callback
 */
const DeleteAuthor = (call, callback) => {
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid Callback Function")
    db.query(`DELETE FROM author WHERE author_id = ?`,[call.request.author_id], (err, res)=>{
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
    GetAllAuthors,
    SearchAuthorByName,
    GetAuthorById,
    AddAuthor,
    EditAuthor,
    DeleteAuthor
}