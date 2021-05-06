# Solution

## About the Project
This project was intended to build a gRPC server in Node.js, which is the main deliverable for the test. 

An Node.js REST server was also built initially to serve as a client for the gRPC server before I know that Wombat will be used for testing the gRPC server.

After talking with Micheal Switzer, I decided to build another gRPC server in Golang to demonstrate my ability to work across multiple languages.

Reviewing of the REST server and Golang server can be optional.

### Docker Structure
![Structure Screen Shot][docker-diagram]

### Database Structure

All relations among author, book and award are designed as many to many. A book can have more that one author, an author can write more than one book, an award can be given to more than one author or book, a book or author can earn more than one awards.
![Database Screen Shot][database-diagram]

## Prerequisites

Docker, Docker Compose, Terraform

## How to start

### Development

   ```sh
   sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

   ```

### Terraform provision
The terraform file will create a security group and a EC2 instance opening ports: 

| port  | description  |
|-------|--------------|
| 22    | SSH          |
| 80    | REST API     |
| 50051 | Node.js gRPC |
| 50052 | Golang gRPC  |

To run:
   ```sh
   terraform -chdir=terraform apply
   ```

To configure the instance, SSH into the instance and install docker and docker-compose, export necessary environment variables(can be checked in docker-compose.prod.yml) and pull source code from github.

### Production

On local machine
   ```sh
   cp literature gRPCclient -r
   cp literature gRPCserver -r
   cp literature gRPCserver_go -r
   sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
   sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml push
   ```

On AWS EC2

   ```sh
   sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
   sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
   ```

## Concerns and questions

1. Because of the names of author, award or book can have different versions, the name are not used as key of the tables in database, instead an additional search function for each table are implemented.
2. When implementing services in Go, I did not figure out how to create a server struct and implement services in separate packages, which end up implementing all functions in one file. What can be a better way to do it?
3. Live reloading for development for Go server was not implemented, but I should have implemented that.
4. I tried to only compile `.proto` file in docker so that I can make sure all three servers have same `.proto` file when I make change to it, but that will confuse my IDE since the package is missing in local. Is there a better way to make sure `.proto` file is consistant?









[docker-diagram]: docker.png
[database-diagram]: database.png