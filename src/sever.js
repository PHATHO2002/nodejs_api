
import path from "path";
import express from "express";
import initwebRouters from "./routers";
import configviewEngine from "./config/viewEngine";
import connectDB from "./config/connectingDB";
import cors from 'cors';
require('dotenv').config();



const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//template engine
configviewEngine(app);

// router init
initwebRouters(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(` app listening on ${port}`);
});
