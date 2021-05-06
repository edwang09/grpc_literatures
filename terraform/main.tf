terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Value need to be filled before provisioning, (these value are stored as environment variables in my local machine)
variable "key_name" {
}
variable "access_key" {
}
variable "secret_key" {
}


# Configure the AWS Provider
provider "aws" {
  region     = "us-east-1"
  access_key = var.access_key
  secret_key = var.secret_key
}


# Create security group to open ports
resource "aws_security_group" "allow_web_traffic" {
  name = "allow_web_traffic"
  ingress = [{
    description      = "HTTP"
    to_port          = 80
    from_port        = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    security_groups  = []
    self             = false
    }, {
    description      = "gRPCnode"
    to_port          = 50051
    from_port        = 50051
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    security_groups  = []
    self             = false
    }, {
    description      = "gRPCgo"
    to_port          = 50052
    from_port        = 50052
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    security_groups  = []
    self             = false
    }, {
    description      = "SSH"
    to_port          = 22
    from_port        = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    security_groups  = []
    self             = false
  }]
  egress = [{
    description      = "e"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    security_groups  = []
    self             = false
    to_port          = 0
    from_port        = 0
    protocol         = "-1"
  }]
}
# Create a EC2 with the created security group
resource "aws_instance" "server" {
  ami             = "ami-042e8287309f5df03"
  instance_type   = "t2.micro"
  key_name        = var.key_name
  security_groups = ["allow_web_traffic"]
  depends_on = [
    aws_security_group.allow_web_traffic
  ]
  tags = {
    Name = "grpc_service"
  }
}
