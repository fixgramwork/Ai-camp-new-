const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');
const PORT = 3000;


const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('capture', () => {
        exec('python detect.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            socket.emit('detection-result', stdout);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.use(express.static("/Users/kimminje/AI\ CAMP(new)"));

//home
app.get("/", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/main.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/main.css");
});

//로그인
app.get("/login", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/login.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/login.css");
});

//챌린지
app.get("/challenge", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/challenge.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/challenge.css");
});

//랭크
app.get("/rank", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/rank.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/rank.css");
});

//대전
app.get("/pvp", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/pvp.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/pvp.css");
});

//목록, 공유
app.get("/list", (req, res) => {
    res.sendFile("/Users/kimminje/AI-CAMP(new)/list.html");
    res.sendFile("/Users/kimminje/AI-CAMP(new)/list.css");
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});