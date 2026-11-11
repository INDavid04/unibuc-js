const jwt = require("jsonwebtoken");

const JWT_SECRET = "my-lab-key";

function authMiddleware(req, res, next) { 
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ error: "Missing or invalid authentification!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET); /// decripteaza token-ul
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token!" });
    }
    
}

module.exports = { authMiddleware, JWT_SECRET };
