const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../db");
const { JWT_SECRET, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

/// POST /auth/login
/// Body: { "username": "admin", "password": "123" }
router.post("/login", (req, res) => {
    const { username, password } = req.body || {};
    const user = users.find(
        (user) => user.username === username && user.password === password,
    );

    if (!user) {
        res.status(401).json({ error: "Invalid username or password!" });
    }

    const payload = { id: user.id, username: user.username };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
});

router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
