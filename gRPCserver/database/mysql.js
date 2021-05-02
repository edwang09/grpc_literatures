//mysql
const mysql = require('mysql')
const {MYSQL_IP, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = require("../config/config")
var db;
module.exports = {
    getDb: function () {
        if (db) return db;
        db = mysql.createConnection({
            host: MYSQL_IP,
            port: MYSQL_PORT,
            user: "root",
            password: MYSQL_PASSWORD,
            database: "literature"
        });
        tryConnect(db);
        return db;
    }
};

const tryConnect = (db)=>{
    db.connect(function(err) {
        if (err) {
            console.log(err);
            console.log("trying to reconnect");
            setTimeout(()=>tryConnect(db), 10000);
        }else{
            console.log("Connected!");

        }
    });
}
