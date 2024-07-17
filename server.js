const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const http = require('http');
const fs = require('fs');


// 정적 파일 제공을 위한 설정
app.use(express.static(__dirname));
app.use(express.json());

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 사용자 조회
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // 비밀번호 확인
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    });
});

// 미션 목록
const missions = [
    "함께 요리하기",
    "공원에서 산책하기",
    "가까운 도서관에서 책 읽기",
    "함께 영화 보기",
    "맛있는 디저트 만들기",
    "가족 앨범 만들기",
    "박물관이나 미술관 방문하기",
    "실내 피크닉 준비하기",
    "맛있는 저녁 식사 요리하기",
    "함께 자전거 타기"
];

// 랜덤으로 미션 선택하는 함수
function getRandomMission() {
    const randomIndex = Math.floor(Math.random() * missions.length);
    return missions[randomIndex];
}

// HTTP 서버 생성
const server = http.createServer((req, res) => {
    // 루트 경로에 접근할 경우 index.html 파일 전송
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    // /getMission 경로에 접근할 경우 랜덤 미션 전송
    else if (req.url === '/challenge/getmission') {
        const mission = getRandomMission();
        const responseData = JSON.stringify({ mission });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(responseData);
    }
    // 존재하지 않는 경로에 접근할 경우 404 에러 전송
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});
