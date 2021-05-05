FROM golang:latest
WORKDIR /app
COPY . ./
RUN go mod tidy
RUN go mod download
RUN export GO111MODULE=on
RUN go get google.golang.org/protobuf/cmd/protoc-gen-go
RUN go get google.golang.org/grpc/cmd/protoc-gen-go-grpc
RUN export PATH="$PATH:$(go env GOPATH)/bin"
RUN ./protoc --go_out=.  --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    literature/literature.proto
CMD ["go run main.go"]