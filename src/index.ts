import express from "express";

const app = express();

app.use(express.json());

app.listen(3333, function () {
    console.clear();
    console.log("HTTP Server running");
});
