// Package main implements a server for Greeter service.
package main

import (
	"log"
	"net"

	pb "jr-dev-test/literature"
	mysql "jr-dev-test/mysql"
	server "jr-dev-test/server"

	"google.golang.org/grpc"
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
