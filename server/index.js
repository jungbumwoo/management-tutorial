import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv, { config } from "dotenv";
import mysql from "mysql";

dotenv.config();

const app = express();
const port = process.env.PORT;
const title = "Customer Management";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
});
connection.connect();


app.get('/api', (req, res) => {
    res.send({username: "sibal."});
});

app.use('/api/group', (req, res) => {
    res.send({username: "group sibal."});
})


app.use('/api/users', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            console.log(rows);
            res.send({rows});
        }
    )
})

app.listen(port, ()=> {
    console.log(`✅ Listening on Port at http://localhost:${port}`);
}); 