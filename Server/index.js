const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

app.get("/", (req, res) => {
  res.send("<h1>Route is working the http way<h1>");
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/../App/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => console.log("server is runing"));
