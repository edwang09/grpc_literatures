const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');

const GetAllBooks = (_, callback)=>{
    db.query("SELECT * FROM book", (err, res)=>{
        if (err) callback(err)
        else callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}

const GetBook = (call, callback)=>{
    db.query(`SELECT * FROM book WHERE book.book_id = ${call.request.book_id}`, (err, res)=>{
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
const AddBook = (call, callback)=>{
    db.query(`INSERT INTO book (book_name, format, isbn, page) 
    VALUES (
        '${call.request.book_name}', 
        '${call.request.format}', 
        '${call.request.isbn}', 
        '${call.request.page}'
        ) `, (err, res)=>{
            if (err) callback(err)
            else callback(null, JSON.parse(JSON.stringify({...call.request, book_id: res.insertId})))
        })
}
const EditBook = (call, callback)=>{
    db.query(`
    UPDATE book SET 
    book_name = '${call.request.book_name}' ,
    format = '${call.request.format}',
    isbn = '${call.request.isbn}',
    page = '${call.request.page}'
    WHERE book_id = '${call.request.book_id}'`, (err, res)=>{
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
const DeleteBook = (call, callback)=>{
    db.query(`DELETE FROM book 
    WHERE book_id = '${call.request.book_id}'`, (err, res)=>{
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
    GetAllBooks: GetAllBooks,
    GetBook: GetBook,
    AddBook: AddBook,
    EditBook: EditBook,
    DeleteBook: DeleteBook
}