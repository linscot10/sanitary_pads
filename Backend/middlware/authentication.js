const jwt = require('jsonwebtoken');

// const authentication = (req, res, next) => {

//     const token = res.header('Authorization');

//     if (!token) return res.status(401).json({ erro: 'Access denied' });

//     try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decode;
//         next();

//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// }


// const jwt = require('jsonwebtoken');

// const authentication = (req, res, next) => {
//     // Fetch the Authorization header and split it to get the token
//     const authHeader = req.header('Authorization');
//     const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

//     if (!token) return res.status(401).json({ error: 'Access denied' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to request
//         next();
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };






const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // set user info in request for further use
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};


module.exports = authentication;
