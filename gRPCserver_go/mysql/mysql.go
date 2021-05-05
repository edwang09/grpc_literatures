package mysql

import (
	"fmt"
	"os"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)
// DB is a global variable to hold db connection
var DB *sql.DB

// ConnectDB opens a connection to the database
func ConnectDB() {
	dbaddress := os.Getenv("MYSQL_USER")+":"+os.Getenv("MYSQL_PASSWORD")+"@tcp("+os.Getenv("MYSQL_IP")+":"+os.Getenv("MYSQL_PROT")+")/"+os.Getenv("MYSQL_DB")
	fmt.Printf(dbaddress)
	db, err := sql.Open("mysql", dbaddress)
	if err != nil {
		panic(err.Error())
	}

	DB = db
}