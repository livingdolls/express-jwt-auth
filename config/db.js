import mysql from "mysql2";

const conn = mysql
	.createConnection({
		multipleStatements: true,
		host: "localhost",
		user: "root",
		database: "auth_jwt",
	})
	.promise();

export default conn;
