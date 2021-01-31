import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv, { config } from "dotenv";
import multer from "multer";
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

const upload = multer({dest: "./upload"});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?,?,?,?,?,now(),0)';
    let image = '/image/' + req.file.filename;
    let username = req.body.username;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let email = req.body.email;
    let params = [image, username, birthday, gender, email];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        });
});

app.post('/api/customers/delete', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted=1 WHERE id=?';
    let deleteId = req.body.deleteId;
    let params = [deleteId];
    connection.query(sql, params,
        (err, rows, fields) => {
            console.log("post(/api/customers/delete)")
            console.log(rows);
        });
});

app.delete('/api/customers/delete/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id =?';
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
         res.send(rows);
    })
})


app.use('/api/users', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send({rows});
        }
    )
})

app.listen(port, ()=> {
    console.log(`✅ Listening on Port at http://localhost:${port}`);
}); 