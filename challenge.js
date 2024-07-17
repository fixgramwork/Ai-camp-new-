const http = require('http');
const fs = require('fs');
const path = require('path');

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
    else if (req.url === '/getMission') {
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

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
