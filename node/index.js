import express from "express"
import mysql from "mysql"

const app = express()
const port = 3000

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
}

const connection = mysql.createConnection(config)
connection.query("INSERT INTO people (name) VALUES ('John')")
connection.end()

const getPeople = () => {
    return new Promise((resolve, reject) => {
        const conn = mysql.createConnection(config)
        conn.query("SELECT name FROM people", (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
        conn.end()
    });
}

app.get('/', async (_, res) => {
    let html = `<h1>Full Cycle Rocks!</h1>`

    const people = await getPeople()
    html += `<ul>`
    people.forEach(person => {
        html += `<li>${person.name}</li>`
    })
    html += `</ul>`

    res.send(html)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
