const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllAuthorGrants = (call, callback)=>{
    db.query(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id`, (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        callback(null, {author_grants : JSON.parse(JSON.stringify(res))})
    })
}

const GetAuthorGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id
    WHERE author_grant_id = ${call.request.author_grant_id}`, (err, res)=>{
        if (err) throw err;
        if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "author_grant_id not found",
            })
        }
    })
}
const AddAuthorGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`INSERT INTO author_grant (author_id, award_id) 
    VALUES ('${call.request.author_id}','${call.request.award_id}') `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, author_grant_id: res.insertId})))
    })
}
const EditAuthorGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`UPDATE author_grant 
    SET author_id = '${call.request.author_id}',
    award_id = '${call.request.award_id}' 
    WHERE author_grant_id = '${call.request.author_grant_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteAuthorGrant = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM author_grant WHERE author_grant_id = '${call.request.author_grant_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllAuthorGrants: GetAllAuthorGrants,
    GetAuthorGrant: GetAuthorGrant,
    AddAuthorGrant: AddAuthorGrant,
    EditAuthorGrant: EditAuthorGrant,
    DeleteAuthorGrant: DeleteAuthorGrant
}