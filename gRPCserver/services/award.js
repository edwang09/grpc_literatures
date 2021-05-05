const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');


const GetAllAwards = (_, callback)=>{
    db.query("SELECT * FROM award", (err, res)=>{
        if (err) callback(err)
        else callback(null, {awards : JSON.parse(JSON.stringify(res))})
    })
}

const GetAward = (call, callback)=>{
    console.log(call.request)
    db.query(`SELECT * FROM award WHERE award_id = ${call.request.award_id}`, (err, res)=>{
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
const AddAward = (call, callback)=>{
    db.query(`INSERT INTO award (award_name) VALUES ('${call.request.award_name}') `, (err, res)=>{
        if (err) callback(err)
        else callback(null, JSON.parse(JSON.stringify({...call.request, award_id: res.insertId})))
})
}
const EditAward = (call, callback)=>{
    console.log(call.request)
    db.query(`UPDATE award SET award_name = '${call.request.award_name}' WHERE award_id = '${call.request.award_id}'`, (err, res)=>{
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
const DeleteAward = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM award WHERE award_id = '${call.request.award_id}'`, (err, res)=>{
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
    GetAllAwards: GetAllAwards,
    GetAward: GetAward,
    AddAward: AddAward,
    EditAward: EditAward,
    DeleteAward: DeleteAward
}