const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const GetAllBookAuthors = (call, callback)=>{
    db.query(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id`, (err, res)=>{
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(res)));
        callback(null, {book_authors : JSON.parse(JSON.stringify(res))})
    })
}

const GetBookAuthor = (call, callback)=>{
    console.log(call.request)
    db.query(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id
    WHERE book_author_id = ${call.request.book_author_id}`, (err, res)=>{
        if (err) throw err;
        if (res.length>0){
            callback(null, JSON.parse(JSON.stringify(res[0])))
        }else{
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: "book_author_id not found",
            })
        }
    })
}
const AddBookAuthor = (call, callback)=>{
    console.log(call.request)
    db.query(`INSERT INTO book_author (book_id, author_id) 
    VALUES ('${call.request.book_id}','${call.request.author_id}') `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, book_author_id: res.insertId})))
    })
}
const EditBookAuthor = (call, callback)=>{
    console.log(call.request)
    db.query(`UPDATE book_author 
    SET book_id = '${call.request.book_id}',
    author_id = '${call.request.author_id}' 
    WHERE book_author_id = '${call.request.book_author_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteBookAuthor = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM book_author WHERE book_author_id = '${call.request.book_author_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllBookAuthors: GetAllBookAuthors,
    GetBookAuthor: GetBookAuthor,
    AddBookAuthor: AddBookAuthor,
    EditBookAuthor: EditBookAuthor,
    DeleteBookAuthor: DeleteBookAuthor
}