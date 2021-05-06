# Solution

## About the Project
### Docker Structure
![Structure Screen Shot][docker-diagram]

### Database Structure
![Database Screen Shot][database-diagram]

## Prerequisites

Docker, Docker Compose, Terraform

## How to start

### Development

   ```sh
   sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

   ```

### Terraform provision
the terraform file will create a security group and a EC2 instance opening ports of 22(for SSH), 80(for REST API), 50051(for Node GRPC server), 50052(for go GRPC server).

   ```sh
   terraform -chdir=terraform apply
   ```
After the instance been created, SSH into the instance and install docker and docker-compose, export necessary environment variables(can be checked in docker-compose.prod.yml) and pull source code from github.

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

## Concern

Because of the names of author, award or book can have different versions, the name are not used as key of the tables in database, instead an additional search function for each table are implemented.










[docker-diagram]: docker.png
[database-diagram]: database.png