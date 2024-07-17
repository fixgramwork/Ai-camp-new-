const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


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

app.post('/api/login', (req, res) => {
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