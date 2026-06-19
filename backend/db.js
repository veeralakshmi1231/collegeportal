const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "veeralakshmi.9947@96",
  database: "college_portal"
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
  } else {
    console.log("Database Connected");
  }
});

module.exports = connection;