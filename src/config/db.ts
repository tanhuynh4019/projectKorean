import mysql from 'mysql'
import util from 'util'


class MySql {

    private query_data = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }


    public Connect() {
        var con = mysql.createConnection(this.query_data)
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    public async Query(sql: string, values: any[]) {
        try {
            var con: any = await mysql.createConnection(this.query_data)
            const query = util.promisify(con.query).bind(con)
            const result: any = await query(sql, values)
            return result
        } catch (err) {
            console.log(err);
            return false
        }
    }
}

export default new MySql()
