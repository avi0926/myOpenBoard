const express = require("express"); //Access
const socket = require("socket.io"); //Access

const app = express();  //Initialize and server ready

app.use(express.static("public")); //use to connect with our index file

let port = 3003;
let server = app.listen(port, ()=>{
    console.log("Listening to port "+ port);
}) 

let io = socket(server);  //socket is a fuction in which we pass our server 

io.on("connection",(socket)=>{
    console.log("made socket connection");

    //Received data
    socket.on("beginPath",(data)=>{
        //data -> data from frontend
        //transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data)=>{
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data)=>{
        io.sockets.emit("redoUndo", data)
    })
}) // on event 