const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const {ValidateCallback, ValidateRequest} = require('../helper/helper');

/**
 * @callback requestCallback
 * @param {Object} error
 * @param {Object} response
 */



/**
 * Get all awards granted to author with award and author names
 * @param {Object} _ 
 * @param {requestCallback} callback
 */
const GetAllAuthorGrants = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id`, (err, res)=>{
        if (err) callback(err)
        else callback(null, {author_grants : JSON.parse(JSON.stringify(res))})
    })
}

/**
 * Get one awards granted to author by id with award and author names
 * @param {Object} call
 * @param {requestCallback} callback
 */
const GetAuthorGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id
    WHERE author_grant_id = ?`,[call.request.author_grant_id], (err, res)=>{
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
 * Associate an award to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const AddAuthorGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`INSERT INTO author_grant (author_id, award_id) 
    VALUES (?,?') `,[call.request.author_id, call.request.award_id], (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, author_grant_id: res.insertId})))
    })
}
/**
 * Edit association of an award to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const EditAuthorGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`UPDATE author_grant 
    SET author_id = ?, award_id = ?
    WHERE author_grant_id = ?`,[call.request.author_id, call.request.award_id, call.request.author_grant_id], (err, res)=>{
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
 * Remove association of an award to an author
 * @param {Object} call
 * @param {requestCallback} callback
 */
const DeleteAuthorGrant = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`DELETE FROM author_grant WHERE author_grant_id = ?`,[call.request.author_grant_id], (err, res)=>{
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
    GetAllAuthorGrants,
    GetAuthorGrant,
    AddAuthorGrant,
    EditAuthorGrant,
    DeleteAuthorGrant
}