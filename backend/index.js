const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    const murl = url.parse(req.url);
    res.end("This is home page");
})

app.get("/home", (req, res) => {
    res.end("This is a basic home page");
})
