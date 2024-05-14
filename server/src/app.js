'use strict';

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cors());

const userRouter = require("./routes/user-router");

app.use("/", userRouter);

module.exports = app;