import cors from "cors";
import express from "express";
import dotenv, { config } from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

console.log("hi");

app.listen(port, ()=> {
    console.log(`✅ Listening on Port at http://localhost:${port}`);
});