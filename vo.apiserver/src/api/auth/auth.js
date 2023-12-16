const { express, hashData, connection, jwt } = require('../../config/common');
require('dotenv').config();


async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = authenticateToken