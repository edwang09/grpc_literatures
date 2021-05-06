// Package main implements a server for Greeter service.
package server

import (
	"context"
	"errors"
	pb "jr-dev-test/literature"
	mysql "jr-dev-test/mysql"
)

type Server struct {
	pb.UnimplementedLiteratureServer
}

func (s *Server) TestgRPC(ctx context.Context, in *pb.Text) (*pb.Text, error) {
	return &pb.Text{Body: "Hello " + in.GetBody()}, nil
}

func (s *Server) GetAllAuthors(ctx context.Context, in *pb.Empty) (*pb.AuthorList, error) {
	var authors []*pb.Author
	results, err := mysql.DB.Query("SELECT * FROM author")
	for results.Next() {
		var author pb.Author
		err = results.Scan(&author.AuthorId, &author.AuthorName)
		authors = append(authors, &author)
	}
	if err != nil {
		return nil, err
	}
	return &pb.AuthorList{Authors: authors}, nil
}
func (s *Server) GetAuthorById(ctx context.Context, in *pb.AuthorId) (*pb.Author, error) {
	var author pb.Author
	err := mysql.DB.QueryRow("SELECT * FROM author WHERE author_id = ?", in.GetAuthorId()).Scan(&author.AuthorId, &author.AuthorName)
	if err != nil {
		return nil, err
	}
	return &author, nil
}
func (s *Server) SearchAuthorByName(ctx context.Context, in *pb.AuthorName) (*pb.AuthorList, error) {
	var authors []*pb.Author
	results, err := mysql.DB.Query("SELECT * FROM author WHERE author_name LIKE ?", "%"+in.GetAuthorName()+"%")
	for results.Next() {
		var author pb.Author
		err = results.Scan(&author.AuthorId, &author.AuthorName)
		authors = append(authors, &author)
	}
	if err != nil {
		return nil, err
	}
	return &pb.AuthorList{Authors: authors}, nil
}
func (s *Server) AddAuthor(ctx context.Context, in *pb.AuthorName) (*pb.Author, error) {
	res, err := mysql.DB.Exec("INSERT INTO author (author_name) VALUES (?) ", in.GetAuthorName())
	if err != nil {
		return nil, err
	}
	AuthorId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.Author{AuthorId: int32(AuthorId), AuthorName: in.GetAuthorName()}, nil
}
func (s *Server) EditAuthor(ctx context.Context, in *pb.Author) (*pb.Author, error) {
	res, err := mysql.DB.Exec("UPDATE author SET author_name = ? WHERE author_id = ?", in.GetAuthorName(), in.GetAuthorId())
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteAuthor(ctx context.Context, in *pb.AuthorId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec("DELETE FROM author WHERE author_id = ?", in.GetAuthorId())
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) GetAllBooks(ctx context.Context, in *pb.Empty) (*pb.BookList, error) {
	var books []*pb.Book
	results, err := mysql.DB.Query("SELECT * FROM book")
	for results.Next() {
		var book pb.Book
		err = results.Scan(&book.BookId, &book.BookName, &book.Format, &book.Isbn, &book.Page)
		books = append(books, &book)
	}
	if err != nil {
		return nil, err
	}
	return &pb.BookList{Books: books}, nil
}
func (s *Server) GetBookById(ctx context.Context, in *pb.BookId) (*pb.Book, error) {
	var book pb.Book
	err := mysql.DB.QueryRow("SELECT * FROM book WHERE book_id = ?", in.GetBookId()).Scan(&book.BookId, &book.BookName, &book.Format, &book.Isbn, &book.Page)
	if err != nil {
		return nil, err
	}
	return &book, nil
}
func (s *Server) SearchBookByName(ctx context.Context, in *pb.BookName) (*pb.BookList, error) {
	var books []*pb.Book
	results, err := mysql.DB.Query("SELECT * FROM book WHERE book_name LIKE ?", "%"+in.GetBookName()+"%")
	for results.Next() {
		var book pb.Book
		err = results.Scan(&book.BookId, &book.BookName, &book.Format, &book.Isbn, &book.Page)
		books = append(books, &book)
	}
	if err != nil {
		return nil, err
	}
	return &pb.BookList{Books: books}, nil
}
func (s *Server) AddBook(ctx context.Context, in *pb.NewBook) (*pb.Book, error) {
	res, err := mysql.DB.Exec(`INSERT INTO book (book_name, format, isbn, page ) VALUES (?, ?, ?, ? ) `,
		in.GetBookName(), in.GetFormat(), in.GetIsbn(), in.GetPage())
	if err != nil {
		return nil, err
	}
	BookId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.Book{BookId: int32(BookId), BookName: in.GetBookName(), Format: in.GetFormat(), Isbn: in.GetIsbn(), Page: in.GetPage()}, nil
}
func (s *Server) EditBook(ctx context.Context, in *pb.Book) (*pb.Book, error) {
	res, err := mysql.DB.Exec(`UPDATE book 
	SET book_name = ?, 
	format = ?, 
	isbn = ?, 
	page = ? 
	WHERE book_id = ?`, in.GetBookName(), in.GetFormat(), in.GetIsbn(), in.GetPage(), in.GetBookId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteBook(ctx context.Context, in *pb.BookId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec("DELETE FROM book WHERE book_id = ?", in.GetBookId())
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) GetAllAwards(ctx context.Context, in *pb.Empty) (*pb.AwardList, error) {
	var awards []*pb.Award
	results, err := mysql.DB.Query("SELECT * FROM award")
	for results.Next() {
		var award pb.Award
		err = results.Scan(&award.AwardId, &award.AwardName)
		awards = append(awards, &award)
	}
	if err != nil {
		return nil, err
	}
	return &pb.AwardList{Awards: awards}, nil
}
func (s *Server) GetAwardById(ctx context.Context, in *pb.AwardId) (*pb.Award, error) {
	var award pb.Award
	err := mysql.DB.QueryRow("SELECT * FROM award WHERE award_id = ?", in.GetAwardId()).Scan(&award.AwardId, &award.AwardName)
	if err != nil {
		return nil, err
	}
	return &award, nil
}
func (s *Server) SearchAwardByName(ctx context.Context, in *pb.AwardName) (*pb.AwardList, error) {
	var awards []*pb.Award
	results, err := mysql.DB.Query("SELECT * FROM award WHERE award_name LIKE ?", "%"+in.GetAwardName()+"%")
	for results.Next() {
		var award pb.Award
		err = results.Scan(&award.AwardId, &award.AwardName)
		awards = append(awards, &award)
	}
	if err != nil {
		return nil, err
	}
	return &pb.AwardList{Awards: awards}, nil
}
func (s *Server) AddAward(ctx context.Context, in *pb.AwardName) (*pb.Award, error) {
	res, err := mysql.DB.Exec("INSERT INTO award (award_name) VALUES (?) ", in.GetAwardName())
	if err != nil {
		return nil, err
	}
	AwardId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.Award{AwardId: int32(AwardId), AwardName: in.GetAwardName()}, nil
}
func (s *Server) EditAward(ctx context.Context, in *pb.Award) (*pb.Award, error) {
	res, err := mysql.DB.Exec("UPDATE award SET award_name = ? WHERE award_id = ?", in.GetAwardName(), in.GetAwardId())
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteAward(ctx context.Context, in *pb.AwardId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec("DELETE FROM award WHERE award_id = ?", in.GetAwardId())
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) GetAllBookAuthors(ctx context.Context, in *pb.Empty) (*pb.BookAuthorList, error) {
	var bookAuthors []*pb.BookAuthorDetail
	results, err := mysql.DB.Query(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id`)
	for results.Next() {
		var bookAuthor pb.BookAuthorDetail
		err = results.Scan(&bookAuthor.BookAuthorId, &bookAuthor.BookId, &bookAuthor.BookName, &bookAuthor.AuthorId, &bookAuthor.AuthorName)
		bookAuthors = append(bookAuthors, &bookAuthor)
	}
	if err != nil {
		return nil, err
	}
	return &pb.BookAuthorList{BookAuthors: bookAuthors}, nil
}
func (s *Server) GetBookAuthor(ctx context.Context, in *pb.BookAuthorId) (*pb.BookAuthorDetail, error) {
	var bookAuthor pb.BookAuthorDetail
	err := mysql.DB.QueryRow(`SELECT 
    book_author.book_author_id,
    book.book_id,
    book.book_name,
    author.author_id,
    author.author_name
    FROM book_author 
    inner join book on book.book_id = book_author.book_id
    inner join author on author.author_id = book_author.author_id
    WHERE book_author_id = ?`, in.GetBookAuthorId()).Scan(&bookAuthor.BookAuthorId, &bookAuthor.BookId, &bookAuthor.BookName, &bookAuthor.AuthorId, &bookAuthor.AuthorName)
	if err != nil {
		return nil, err
	}
	return &bookAuthor, nil
}
func (s *Server) AddBookAuthor(ctx context.Context, in *pb.NewBookAuthor) (*pb.BookAuthor, error) {
	res, err := mysql.DB.Exec(`INSERT INTO book_author (book_id, author_id) 
    VALUES (?,?)`, in.GetBookId(), in.GetAuthorId())
	if err != nil {
		return nil, err
	}
	BookAuthorId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.BookAuthor{BookAuthorId: int32(BookAuthorId), BookId: in.GetBookId(), AuthorId: in.GetAuthorId()}, nil
}
func (s *Server) EditBookAuthor(ctx context.Context, in *pb.BookAuthor) (*pb.BookAuthor, error) {
	res, err := mysql.DB.Exec(`UPDATE book_author 
    SET book_id = ?,
    author_id = ? 
    WHERE book_author_id = ?`, in.GetBookId(), in.GetAuthorId(), in.GetBookAuthorId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteBookAuthor(ctx context.Context, in *pb.BookAuthorId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec(`DELETE FROM book_author WHERE book_author_id = ?`, in.GetBookAuthorId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) GetAllAuthorGrants(ctx context.Context, in *pb.Empty) (*pb.AuthorGrantList, error) {
	var authorGrants []*pb.AuthorGrantDetail
	results, err := mysql.DB.Query(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id`)
	for results.Next() {
		var authorGrant pb.AuthorGrantDetail
		err = results.Scan(&authorGrant.AuthorGrantId, &authorGrant.AwardId, &authorGrant.AwardName, &authorGrant.AuthorId, &authorGrant.AuthorName)
		authorGrants = append(authorGrants, &authorGrant)
	}
	if err != nil {
		return nil, err
	}
	return &pb.AuthorGrantList{AuthorGrants: authorGrants}, nil
}
func (s *Server) GetAuthorGrant(ctx context.Context, in *pb.AuthorGrantId) (*pb.AuthorGrantDetail, error) {
	var authorGrant pb.AuthorGrantDetail
	err := mysql.DB.QueryRow(`SELECT 
    author_grant.author_grant_id,
    award.award_id,
    award.award_name,
    author.author_id,
    author.author_name
    FROM author_grant 
    inner join author on author.author_id = author_grant.author_id
    inner join award on award.award_id = author_grant.award_id
    WHERE author_grant_id = ?`, in.GetAuthorGrantId()).Scan(&authorGrant.AuthorGrantId, &authorGrant.AwardId, &authorGrant.AwardName, &authorGrant.AuthorId, &authorGrant.AuthorName)
	if err != nil {
		return nil, err
	}
	return &authorGrant, nil
}
func (s *Server) AddAuthorGrant(ctx context.Context, in *pb.NewAuthorGrant) (*pb.AuthorGrant, error) {
	res, err := mysql.DB.Exec(`INSERT INTO author_grant (author_id, award_id) 
    VALUES (?,?)`, in.GetAuthorId(), in.GetAwardId())
	if err != nil {
		return nil, err
	}
	AuthorGrantId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.AuthorGrant{AuthorGrantId: int32(AuthorGrantId), AwardId: in.GetAwardId(), AuthorId: in.GetAuthorId()}, nil
}
func (s *Server) EditAuthorGrant(ctx context.Context, in *pb.AuthorGrant) (*pb.AuthorGrant, error) {
	res, err := mysql.DB.Exec(`UPDATE author_grant 
    SET author_id = ?,
    award_id = ? 
    WHERE author_grant_id = ?`, in.GetAuthorId(), in.GetAwardId(), in.GetAuthorGrantId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteAuthorGrant(ctx context.Context, in *pb.AuthorGrantId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec(`DELETE FROM author_grant WHERE author_grant_id = ?`, in.GetAuthorGrantId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) GetAllBookGrants(ctx context.Context, in *pb.Empty) (*pb.BookGrantList, error) {
	var bookGrants []*pb.BookGrantDetail
	results, err := mysql.DB.Query(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id`)
	for results.Next() {
		var bookGrant pb.BookGrantDetail
		err = results.Scan(&bookGrant.BookGrantId, &bookGrant.AwardId, &bookGrant.AwardName, &bookGrant.BookId, &bookGrant.BookName)
		bookGrants = append(bookGrants, &bookGrant)
	}
	if err != nil {
		return nil, err
	}
	return &pb.BookGrantList{BookGrants: bookGrants}, nil
}
func (s *Server) GetBookGrant(ctx context.Context, in *pb.BookGrantId) (*pb.BookGrantDetail, error) {
	var bookGrant pb.BookGrantDetail
	err := mysql.DB.QueryRow(`SELECT 
    book_grant.book_grant_id,
    award.award_id,
    award.award_name,
    book.book_id,
    book.book_name
    FROM book_grant 
    inner join book on book.book_id = book_grant.book_id
    inner join award on award.award_id = book_grant.award_id
    WHERE book_grant_id = ?`, in.GetBookGrantId()).Scan(&bookGrant.BookGrantId, &bookGrant.AwardId, &bookGrant.AwardName, &bookGrant.BookId, &bookGrant.BookName)
	if err != nil {
		return nil, err
	}
	return &bookGrant, nil
}
func (s *Server) AddBookGrant(ctx context.Context, in *pb.NewBookGrant) (*pb.BookGrant, error) {
	res, err := mysql.DB.Exec(`INSERT INTO book_grant (book_id, award_id) 
    VALUES (?,?)`, in.GetBookId(), in.GetAwardId())
	if err != nil {
		return nil, err
	}
	BookGrantId, err := res.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &pb.BookGrant{BookGrantId: int32(BookGrantId), AwardId: in.GetAwardId(), BookId: in.GetBookId()}, nil
}
func (s *Server) EditBookGrant(ctx context.Context, in *pb.BookGrant) (*pb.BookGrant, error) {
	res, err := mysql.DB.Exec(`UPDATE book_grant 
    SET book_id = ?,
    award_id = ? 
    WHERE book_grant_id = ?`, in.GetBookId(), in.GetAwardId(), in.GetBookGrantId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not update")
	}
	return in, nil
}

func (s *Server) DeleteBookGrant(ctx context.Context, in *pb.BookGrantId) (*pb.Empty, error) {
	res, err := mysql.DB.Exec(`DELETE FROM book_grant WHERE book_grant_id = ?`, in.GetBookGrantId())
	if err != nil {
		return nil, err
	}
	affectedrow, err := res.RowsAffected()
	if err != nil {
		return nil, err
	} else if affectedrow == 0 {
		return nil, errors.New("No corresponding record found, did not delete")
	}
	return &pb.Empty{}, nil
}

func (s *Server) MostAwardedAuthor(ctx context.Context, in *pb.Empty) (*pb.MostAwardedAuthors, error) {
	var mostAwardedAuthors []*pb.MostAwardedAuthor
	results, err := mysql.DB.Query(`SELECT 
	author.author_id,
	author.author_name,
	COUNT(author_grant_id) as awarded_time
	FROM author left join author_grant on author.author_id = author_grant.author_id
	GROUP BY author.author_id
	ORDER BY awarded_time DESC
	LIMIT 10`)
	for results.Next() {
		var mostAwardedAuthor pb.MostAwardedAuthor
		err = results.Scan(
			&mostAwardedAuthor.AuthorId,
			&mostAwardedAuthor.AuthorName,
			&mostAwardedAuthor.AwardedTime)
		mostAwardedAuthors = append(mostAwardedAuthors, &mostAwardedAuthor)
	}
	if err != nil {
		return nil, err
	}
	return &pb.MostAwardedAuthors{Authors: mostAwardedAuthors}, nil
}

func (s *Server) MostAwardedBook(ctx context.Context, in *pb.Pagination) (*pb.MostAwardedBooks, error) {
	var mostAwardedBooks []*pb.MostAwardedBook
	var offset int32 = 0
	if in.GetPage() > 0 {
		offset = (in.GetPage() - 1) * 10
	}
	results, err := mysql.DB.Query(`
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
	OFFSET ? `, offset)
	for results.Next() {
		var mostAwardedBook pb.MostAwardedBook
		err = results.Scan(
			&mostAwardedBook.BookId,
			&mostAwardedBook.BookName,
			&mostAwardedBook.Format,
			&mostAwardedBook.Isbn,
			&mostAwardedBook.Page,
			&mostAwardedBook.AwardedTime)
		mostAwardedBooks = append(mostAwardedBooks, &mostAwardedBook)
	}
	if err != nil {
		return nil, err
	}
	return &pb.MostAwardedBooks{Books: mostAwardedBooks}, nil
}
func (s *Server) MostGrantedAward(ctx context.Context, in *pb.Empty) (*pb.MostGrantedAwards, error) {
	var mostGrantedAwards []*pb.MostGrantedAward
	results, err := mysql.DB.Query(`
	SELECT 
	award.award_id,
	award.award_name,
	COUNT(book_grant_id) + COUNT(author_grant_id) as awarded_time
	FROM award 
	left join book_grant on award.award_id = book_grant.award_id
	left join author_grant on award.award_id = author_grant.award_id
	GROUP BY award.award_id
	ORDER BY awarded_time DESC
	LIMIT 5`)
	for results.Next() {
		var mostGrantedAward pb.MostGrantedAward
		err = results.Scan(
			&mostGrantedAward.AwardId,
			&mostGrantedAward.AwardName,
			&mostGrantedAward.AwardedTime)
		mostGrantedAwards = append(mostGrantedAwards, &mostGrantedAward)
	}
	if err != nil {
		return nil, err
	}
	return &pb.MostGrantedAwards{Awards: mostGrantedAwards}, nil
}
