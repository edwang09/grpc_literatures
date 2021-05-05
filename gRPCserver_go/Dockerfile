FROM golang:latest
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod tidy
RUN go mod download
CMD ["go run main.go"]