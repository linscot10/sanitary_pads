const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

    const token = res.header('Authorization');

    if (!token) return res.status(401).json({ erro: 'Access denied' });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = authentication;