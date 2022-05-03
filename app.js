const express = require("express");
const app = express();
const session = require("express-session");
const cors = require('cors');
const router = require("./routers/router");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
require("dotenv").config();
app.listen(4000)
app.use(cors({credentials: true, origin: true}));
app.use(express.json());




mongoose.connect(process.env.MONGO_KEY).then((res) => {
    console.log("Successfully connected")
}).catch(e => {
    console.log(e);
    console.log("Failed to connect")
});


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false},
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_KEY,
            maxAge: 300000
        }),
    })
);



app.use("/", router);




