const mysql = require("mysql");

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jsdb",
    port: 3306,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
});

class Database {
    async executeQuery(query) {
        const data = await new Promise((resolve) => {
            db.query(query, (err, result) => {
                resolve(result);
            });
        });
        return data;
    }
}

module.exports = Database;
