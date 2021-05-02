const db = require('../database/mysql').getDb();

const GetAllAuthors = (call, callback)=>{
    db.query("SELECT * FROM author", (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        var normalObj = Object.assign({}, res);
        console.log(typeof res);
        callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}

// const GetAuthor = (call, callback)=>{
//     callback(null, {body : "from gRPC server: " + call.request.body})
// }
// const AddAuthor = (call, callback)=>{
//     callback(null, {body : "from gRPC server: " + call.request.body})
// }
// const EditAuthor = (call, callback)=>{
//     callback(null, {body : "from gRPC server: " + call.request.body})
// }
// const DeleteAuthor = (call, callback)=>{
//     callback(null, {body : "from gRPC server: " + call.request.body})
// }



module.exports = {
    GetAllAuthors: GetAllAuthors,
    // GetAuthor: GetAuthor,
    // AddAuthor: AddAuthor,
    // EditAuthor: EditAuthor,
    // DeleteAuthor: DeleteAuthor
}