const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const getallquery = `
SELECT  
book.book_id,
book.book_name,
book.format,
book.isbn,
book.page
FROM book`






const GetAllBooks = (call, callback)=>{
    db.query(getallquery, (err, res)=>{
        if (err) throw err;
        // const books  = res.map((item)=>{
        //     let data = JSON.parse(item.cat)
        //     return {
        //         book_id : data.book_id,
        //         book_name : data.book_name,
        //         author_id : data.author_id,
        //         author_name : data.author_name,
        //         formats : data.formats,
        //     }
        // });
        console.log(JSON.parse(JSON.stringify(res)));
        callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}

const GetBook = (call, callback)=>{
    console.log(call.request.book_id)
    db.query(`SELECT 
    book.book_id,
    book.book_name,
    book.format,
    book.isbn,
    book.page
    FROM book
    WHERE book.book_id = ${call.request.book_id}`, (err, res)=>{
        if (err) throw err;
        callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}
const AddBook = (call, callback)=>{
    console.log(call.request)
    db.query(`INSERT INTO book (book_name, format, isbn, page ) 
    VALUES (
        '${call.request.book_name}', 
        '${call.request.format}', 
        '${call.request.isbn}', 
        '${call.request.page}'
        ) `, (err, res)=>{
        if (err) throw err;
        console.log(res.insertId)
        callback(null, JSON.parse(JSON.stringify({...call.request, book_id: res.insertId})))
    })
}
const EditBook = (call, callback)=>{
    console.log(call.request)
    db.query(`
    UPDATE book SET 
    book_name = '${call.request.book_name}' ,
    format = '${call.request.format}',
    isbn = '${call.request.isbn}',
    page = '${call.request.page}'
    WHERE book_id = '${call.request.book_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, JSON.parse(JSON.stringify(call.request)))
    })
}
const DeleteBook = (call, callback)=>{
    console.log(call.request)
    db.query(`DELETE FROM book 
    WHERE book_id = '${call.request.book_id}'`, (err, res)=>{
        if (err) throw err;
        console.log(res)
        callback(null, {})
    })
}



module.exports = {
    GetAllBooks: GetAllBooks,
    GetBook: GetBook,
    AddBook: AddBook,
    EditBook: EditBook,
    DeleteBook: DeleteBook
}