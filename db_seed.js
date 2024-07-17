const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 미션 데이터
let missions = [
    { progress: '1/1', description: '어머니 안마해드리기', complete: true, points: 3 },
    { progress: '1/3', description: '가족과 취미생활 공유', complete: false, points: 5 },
    { progress: '2/4', description: '가족과 노래방', complete: false, points: 10 },
    { progress: '0/1', description: '아버지와 쇼츠', complete: false, points: 4 },
    { progress: '2/3', description: '가족과 같이 식사', complete: false, points: 2 }
];

// 정적 파일 제공을 위한 설정
app.use(express.static(__dirname));
app.use(bodyParser.json());

// challenge.html 페이지 라우팅
app.get("/challenge", (req, res) => {
    res.sendFile(path.join(__dirname, 'challenge.html'));
});

// API 엔드포인트 - 미션 데이터 가져오기
app.get("/api/getMissions", (req, res) => {
    res.json(missions);
});

// API 엔드포인트 - 미션 상태 업데이트
app.post("/api/updateMission", (req, res) => {
    const { index, complete } = req.body;

    if (index >= 0 && index < missions.length) {
        missions[index].complete = complete;
        res.json({ message: '미션 상태 업데이트 완료' });
    } else {
        res.status(400).json({ message: '유효하지 않은 인덱스입니다' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
