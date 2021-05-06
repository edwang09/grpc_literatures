const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');

const GetAllBooks = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query("SELECT * FROM book", (err, res)=>{
        if (err) callback(err)
        else callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}

const GetBookById = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT * FROM book WHERE book.book_id = ?`,[call.request.book_id], (err, res)=>{
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
const SearchBookByName = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`SELECT * FROM book WHERE book_name like ?`,["%"+call.request.book_name+"%"], (err, res)=>{
        if (err) callback(err)
        else callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}
const AddBook = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`INSERT INTO book (book_name, format, isbn, page) 
    VALUES (?,?,?,?) `
    ,[call.request.book_name, call.request.format, call.request.isbn, call.request.page], (err, res)=>{
            if (err) callback(err)
            else callback(null, JSON.parse(JSON.stringify({...call.request, book_id: res.insertId})))
        })
}
const EditBook = (call, callback)=>{
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`
    UPDATE book SET 
    book_name = ?, format = ?, isbn = ?, page = ?
    WHERE book_id = ?`
    ,[call.request.book_name, call.request.format, call.request.isbn, call.request.page, call.request.book_id],  (err, res)=>{
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
    if (!ValidateRequest(call)) return console.error("Invalid argument")
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(`DELETE FROM book 
    WHERE book_id = ?`,[call.request.book_id], (err, res)=>{
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
    GetAllBooks,
    GetBookById,
    SearchBookByName,
    AddBook,
    EditBook,
    DeleteBook
}