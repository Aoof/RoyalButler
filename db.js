const mysql = require("mysql")
require("dotenv").config()

const con = mysql.createConnection({
    host         : process.env.HOST,
    user         : process.env.USER,
    password     : process.env.PASSWORD,
    insecureAuth : true,
    database     : process.env.DATABASE
})

module.exports = {
    get(table, condition=null) {
        return new Promise((resolve, reject) => {
            con.query(condition ? `SELECT * FROM ${table} WHERE ${condition}` : "SELECT * FROM " + table,
                function(err, result, fields) {
                    if (err) {
                        reject(err)
                        return;
                    };
                    console.log(condition ? `GET data from ${table} where ${condition}.` : `GET data frmo ${table}.`)
                    resolve(result)
                }
            )
        })
    },
    insert(_names, _values, table) {
        return new Promise((resolve, reject) => {
            names = _names.join(", ")
            values = JSON.stringify(_values)
            values = values.substr(1, values.length - 2)

            names = `(${names})`
            values = `(${values})`
            
    
            con.query(`INSERT IGNORE INTO ${table} ${names} VALUES ${values}`,
                function(err, result, fields) {
                    if (err) {
                        reject(err)
                        return;
                    };

                    resolve(`Successfully inserted data to ${table} table.`)
                }
            )
        })
    },
    update(pk, names, values, table) {
        return new Promise((resolve, reject) => {

            let updated = "" 
            
            names.forEach(res => {
                updated += (names.length != names.indexOf(res)) ? `${res} = ${values[names.indexOf(res)]}` : `${res} = ${values[names.indexOf(res)]}, `
            })

            if (updated.endsWith(",")) {
                updated = updated.substr(0, updated.length - 1)
            }

            con.query(`UPDATE ${table} SET ${updated} WHERE ${pk[0]} = ${pk[1]}`, 
                function(err, result, fields) {
                    if (err) {
                        reject(err)
                        return;
                    };
                    
                    names = names.join(", ")
                    values = JSON.stringify(values)
                    values = values.substr(1, values.length - 2)

                    names = `(${names})`
                    values = `(${values})`
                    resolve(`Successfully updated ${names} to ${values} at ${table}.`)
                }
            )
        })
    }
}
