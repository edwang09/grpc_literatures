const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllAwards = (call, callback)=>{
    db.query("SELECT * FROM award", (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        callback(null, {awards : JSON.parse(JSON.stringify(res))})
    })
}

const GetAward = (call, callback)=>{
    console.log(call.request)
    db.query(`SELECT * FROM award WHERE award_id = ${call.request.award_id}`, (err, res)=>{
        if (err) throw err;
        if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "award_id not found",
            })
        }
    })
}
const AddAward = (call, callback)=>{
    console.log(call.request)
    db.query(`INSERT INTO award (award_name) VALUES ('${call.request.award_name}') `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, award_id: res.insertId})))
    })
}
const EditAward = (call, callback)=>{
    console.log(call.request)
    db.query(`UPDATE award SET award_name = '${call.request.award_name}' WHERE award_id = '${call.request.award_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteAward = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM award WHERE award_id = '${call.request.award_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllAwards: GetAllAwards,
    GetAward: GetAward,
    AddAward: AddAward,
    EditAward: EditAward,
    DeleteAward: DeleteAward
}