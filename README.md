# jr-dev-test

This repository should be forked in your own github account to create your test project.

# Requirements

Your goal is to create a gRPC microservice written in Go, Python, or Node. You MUST NOT use a web framework, so no Gin, Echo, Flask, Django, Express, etc.

Code MUST be able to run locally. 

Code MUST be completed in 1 week.

# Domains

The service must support the following domains:

## Authors

Authors write books and win awards for books. 

Your service must be able to perform all CRUD functions on an author, as well as associate books and awards to an author.

## Books

Books come in multiple formats, hardbound, paperback, digital only. They all have an ISBN, and they all have a number of pages (which typically caries by format). Some books win awards.

Your service must be able to perform all CRUD functions on a book, as well as associate authors and awards to a book.

## Awards

Both authors and books win awards, some are like "NY Times Bestseller" and others are "Hugo" award. See [this list on Wikipedia](https://en.wikipedia.org/wiki/List_of_literary_awards)

Your service must be able to perform all CRUD functions on a book, as well as associate authors and books to respective awards.

# Reports

You must also be able to produce the following reports:
- which authors have the most awards? this report should show the top-10
- which books have the most awards? this report should show the top-50, and be paginated 10 at a time
- which award was given out most frequently? this report should show the top-5

Note: You can produce these however you want, as long as they're accessible in the codebase in your repository, or via an endpoint in your API.

# Bonus Points

Bonus points if this service is dockerized

Bonus points if you can write the terraform to provision this in AWS

# Solution



## About the Project
### Docker Structure
[![Structure Screen Shot][project-screenshot]]

### Database Structure
[![Database Screen Shot][database-screenshot]]

## Prerequisites

Docker, Docker Compose, Terraform

## How to start

### development

   ```sh
   sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

   ```

### Terraform provision
the terraform file will create a security group and a EC2 instance opening ports of 22(for SSH), 80(for REST API), 50051(for Node GRPC server), 50052(for go GRPC server).

   ```sh
   terraform -chdir=terraform apply
   ```
After the instance been created, SSH into the instance and install docker and docker-compose, export necessary environment variables(can be checked in docker-compose.prod.yml) and pull source code from github.

### production

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












[product-screenshot]: docker.png
[product-screenshot]: database.png