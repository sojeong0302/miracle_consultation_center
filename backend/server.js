// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { run, get, all } = require("./db");

const app = express();
app.use(cors()); // 배포 시 특정 도메인으로 제한 권장
app.use(express.json());

// 헬스체크
app.get("/", (_req, res) => res.send("OK"));

function genToken(admin) {
    const payload = { id: admin.id, adminName: admin.adminName };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" });
}
function auth(req, res, next) {
    const auth = req.headers.authorization || "";
    const [type, token] = auth.split(" ");
    if (type?.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({ error: "토큰이 없습니다." });
    }
    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch {
        return res.status(401).json({ error: "토큰이 유효하지 않습니다." });
    }
}

// --- Auth ---
app.post("/register", async (req, res) => {
    try {
        const { adminName, password } = req.body || {};
        if (!adminName || !password) {
            return res.status(400).json({ error: "아이디와 비밀번호를 모두 입력해야 합니다." });
        }
        const exists = await get("SELECT id FROM Admin WHERE adminName = ?", [adminName]);
        if (exists) return res.status(409).json({ error: "이미 존재하는 아이디입니다." });

        const hashed = await bcrypt.hash(password, 10);
        await run("INSERT INTO Admin (adminName, password) VALUES (?, ?)", [adminName, hashed]);
        return res.status(201).json({ message: "관리자 등록 완료" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { adminName, password } = req.body || {};
        if (!adminName || !password) {
            return res.status(400).json({ error: "아이디 또는 비밀번호가 잘못되었습니다." });
        }
        const admin = await get("SELECT * FROM Admin WHERE adminName = ?", [adminName]);
        if (!admin) return res.status(401).json({ error: "아이디 또는 비밀번호가 잘못되었습니다." });

        const ok = await bcrypt.compare(password, admin.password);
        if (!ok) return res.status(401).json({ error: "아이디 또는 비밀번호가 잘못되었습니다." });

        const token = genToken(admin);
        return res.json({ message: "로그인 성공", token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

// --- Write 유틸 ---
function today() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
}
function generateCode(len = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}
async function generateUniqueCode() {
    while (true) {
        const code = generateCode(12);
        const hit = await get("SELECT id FROM User WHERE code = ?", [code]);
        if (!hit) return code;
    }
}

// --- Write 라우트 ---
app.post("/write", async (req, res) => {
    try {
        const { nickName, content, answer } = req.body || {};
        if (!nickName) return res.status(400).json({ error: "닉네임을 입력해주세요." });
        if (!content) return res.status(400).json({ error: "상담 내용을 입력해주세요." });

        const code = await generateUniqueCode();
        const dateStr = today();

        const result = await run(
            `INSERT INTO User (nickName, date, content, isChecked, code, answer)
       VALUES (?, ?, ?, 0, ?, ?)`,
            [nickName, dateStr, content, code, answer ?? null]
        );

        const created = await get("SELECT * FROM User WHERE id = ?", [result.lastID]);
        return res.status(201).json({
            message: "작성 완료!",
            id: created.id,
            nickName: created.nickName,
            date: created.date,
            content: created.content,
            isChecked: !!created.isChecked,
            code: created.code,
            answer: created.answer ?? null,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.get("/writeList", async (_req, res) => {
    try {
        const rows = await all("SELECT * FROM User ORDER BY id DESC");
        return res.json(
            rows.map((i) => ({
                id: i.id,
                nickName: i.nickName,
                date: i.date,
                content: i.content,
                isChecked: !!i.isChecked,
                code: i.code,
                answer: i.answer ?? null,
            }))
        );
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.get("/writeList/:code", async (req, res) => {
    try {
        const item = await get("SELECT * FROM User WHERE code = ?", [req.params.code]);
        if (!item) return res.status(404).json({ error: "해당 code에 대한 정보가 없습니다." });
        return res.json({
            id: item.id,
            nickName: item.nickName,
            date: item.date,
            content: item.content,
            isChecked: !!item.isChecked,
            code: item.code,
            answer: item.answer ?? null,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.get("/view/:code", async (req, res) => {
    try {
        const item = await get("SELECT * FROM User WHERE code = ?", [req.params.code]);
        if (!item) return res.status(404).json({ error: "해당 code에 대한 정보가 없습니다." });
        return res.json({
            nickName: item.nickName,
            date: item.date,
            content: item.content,
            isChecked: !!item.isChecked,
            code: item.code,
            answer: item.answer ?? null,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.patch("/answer/:code", auth, async (req, res) => {
    try {
        const { answer } = req.body || {};
        if (answer == null) return res.status(400).json({ error: "answer 값이 필요합니다." });

        const item = await get("SELECT id FROM User WHERE code = ?", [req.params.code]);
        if (!item) return res.status(404).json({ error: "해당 code에 대한 정보가 없습니다." });

        await run("UPDATE User SET answer = ?, isChecked = 1 WHERE code = ?", [answer, req.params.code]);
        return res.json({ message: "답변 등록 완료" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

app.get("/getAnswerByCode/:code", async (req, res) => {
    try {
        const item = await get("SELECT nickName, answer FROM User WHERE code = ?", [req.params.code]);
        if (!item) return res.status(404).json({ error: "해당 code에 대한 정보가 없습니다." });
        return res.json({ nickName: item.nickName, answer: item.answer ?? null });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "서버 오류" });
    }
});

// --- 서버 시작 ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on :${PORT}`));
