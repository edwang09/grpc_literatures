/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Package main implements a server for Greeter service.
package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
	pb "jr-dev-test/literature"
	mysql "jr-dev-test/mysql"
	server "jr-dev-test/server"
)

const (
	port = ":50052"
)

func main() {
	mysql.ConnectDB()
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterLiteratureServer(s, &server.Server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

// func (s *server) TestgRPC(ctx context.Context, in *pb.Text) (*pb.Text, error) {
// 	log.Printf("Received: %v", in.GetBody())
// 	return &pb.Text{Body: "Hello " + in.GetBody()}, nil
// }

// func (s *server) GetAllAuthors(ctx context.Context, in *pb.Empty) (*pb.AuthorList, error) {
// 	log.Printf("Received: GetAllAuthors ")
// 	var authors []*pb.Author
// 	results, err := mysql.DB.Query("SELECT * FROM author")
// 	for results.Next(){
// 		var author pb.Author
// 		err = results.Scan(&author.AuthorId, &author.AuthorName)
// 		authors = append(authors, &author)
// 	}
// 	if err != nil {
// 		panic(err.Error()) // proper error handling instead of panic in your app
// 	}
// 	return &pb.AuthorList{Authors : authors}, nil
// }
// func (s *server) GetAuthor(ctx context.Context, in *pb.AuthorId) (*pb.Author, error) {
// 	var author pb.Author
// 	err := mysql.DB.QueryRow("SELECT * FROM author WHERE author_id = ?", in.GetAuthorId()).Scan(&author.AuthorId, &author.AuthorName)
// 	if err != nil {
// 		panic(err.Error()) // proper error handling instead of panic in your app
// 	}
// 	return &author, nil
// }
// func (s *server) AddAuthor(ctx context.Context, in *pb.NewAuthor) (*pb.Author, error) {
// 	res, err := mysql.DB.Exec("INSERT INTO author (author_name) VALUES (?) ", in.GetAuthorName())
// 	if err != nil {
// 		panic(err.Error()) // proper error handling instead of panic in your app
// 	}
// 	AuthorId, err := res.LastInsertId()
//     if err != nil {
//         log.Fatal(err)
//     }
// 	return &pb.Author{AuthorId: int32(AuthorId), AuthorName: in.GetAuthorName()}, nil
// }
// func (s *server) EditAuthor(ctx context.Context, in *pb.Author) (*pb.Author, error) {
// 	_, err := mysql.DB.Exec("UPDATE author SET author_name = ? WHERE author_id = ?", in.GetAuthorName(), in.GetAuthorId())
// 	if err != nil {
// 		panic(err.Error()) // proper error handling instead of panic in your app
// 	}
// 	return in, nil
// }

// func (s *server) DeleteAuthor(ctx context.Context, in *pb.AuthorId) (*pb.Empty, error) {
// 	_, err := mysql.DB.Exec("DELETE FROM author WHERE author_id = ?", in.GetAuthorId())
// 	if err != nil {
// 		panic(err.Error()) // proper error handling instead of panic in your app
// 	}
// 	return &pb.Empty{}, nil
// }
