const mysql = require('mysql')
const {MYSQL_IP, MYSQL_PORT, MYSQL_USER,  MYSQL_PASSWORD, MYSQL_DB } = require("../config/config")
var db;
module.exports = {
    getDb: () => {
        if (db) return db;
        db = mysql.createConnection({
            host: MYSQL_IP,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DB
        });
        tryConnect(db);
        return db;
    }
};

const tryConnect = (db)=>{
    db.connect((err) => {
        if (err) {
            console.log(err);
            console.log("trying to reconnect");
            setTimeout(()=>tryConnect(db), 5000);
        }else{
            console.log("Connected!");
        }
    });
}
