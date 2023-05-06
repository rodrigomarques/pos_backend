const mysql = require("mysql2/promise")

/*
host: 'database-1.ch87ii3ngxoj.us-east-2.rds.amazonaws.com',
user: 'admin',
password: '1q2w3e4r5t',
database: 'teste'
*/
class DB{
    async connect() {
        try {
            
            if (global.connection && global.connection.state !== "disconnected")
                return global.connection

            const connection = await mysql.createConnection({
                host: 'localhost',
                database: 'projetopos',
                user: 'root',
                password : 'coti'
            })

            global.connection = connection
            return connection            
        } catch (e) {
            console.log("ERRO DB: " + e)
            return null
        }
    }
}

module.exports = new DB