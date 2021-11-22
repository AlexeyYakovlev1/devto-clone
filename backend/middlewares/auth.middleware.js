const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Нет авторизации" });
        }

        const decoded = jwt.varify(token, config.get("jwtKey"));
        req.user = decoded;

        next();
    } catch(e) {
        res.status(401).json({ message: "Нет авторизации" });
    }
} 