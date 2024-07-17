const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 정적 파일 제공을 위한 설정
app.use(express.static(__dirname));

// home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// 로그인
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 챌린지
app.get("/challenge", (req, res) => {
    res.sendFile(path.join(__dirname, 'challenge.html'));
});

// 랭크
app.get("/rank", (req, res) => {
    res.sendFile(path.join(__dirname, 'rank.html'));
});

// 대전
app.get("/pvp", (req, res) => {
    res.sendFile(path.join(__dirname, 'pvp.html'));
});

// 목록, 공유
app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, 'list.html'));
});

// 상점
app.get("/store", (req, res) => {
    res.sendFile(path.join(__dirname, 'store.html'));
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
