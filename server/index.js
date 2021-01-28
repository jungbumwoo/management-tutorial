import express from "express";
import dotenv, { config } from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, ()=> {
    console.log(`✅ Listening on Port at http://localhost:${port}`);
});