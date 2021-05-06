const db = require('../database/mysql').getDb();
const grpc = require('@grpc/grpc-js');
const authorquery = `
SELECT 
author.author_id,
author.author_name,
COUNT(author_grant_id) as awarded_time
FROM author left join author_grant on author.author_id = author_grant.author_id
GROUP BY author.author_id
ORDER BY awarded_time DESC
LIMIT 10

`


const bookquery =`
SELECT 
book.book_id,
book.book_name,
book.format,
book.isbn,
book.page,
COUNT(book_grant_id) as awarded_time
FROM book left join book_grant on book.book_id = book_grant.book_id
GROUP BY book.book_id
ORDER BY awarded_time DESC
LIMIT 10
OFFSET ?
`

const awardquery =`
SELECT 
award.award_id,
award.award_name,
COUNT(book_grant_id) + COUNT(author_grant_id) as awarded_time
FROM award 
left join book_grant on award.award_id = book_grant.award_id
left join author_grant on award.award_id = author_grant.award_id
GROUP BY award.award_id
ORDER BY awarded_time DESC
LIMIT 5
`


const MostAwardedAuthor = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(authorquery, (err, res)=>{
        if (err) callback(err)
        else callback(null, {authors : JSON.parse(JSON.stringify(res))})
    })
}

const MostAwardedBook = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(bookquery, [page<1 ? 0 : (page-1)*10],  (err, res)=>{
        if (err) callback(err)
        else callback(null, {books : JSON.parse(JSON.stringify(res))})
    })
}
const MostGrantedAward = (_, callback)=>{
    if (!ValidateCallback(callback)) return console.error("Invalid callback Function")
    db.query(awardquery, (err, res)=>{
        if (err) callback(err)
        else callback(null, {awards : JSON.parse(JSON.stringify(res))})
    })
}


module.exports = {
    MostAwardedAuthor,
    MostAwardedBook,
    MostGrantedAward
}