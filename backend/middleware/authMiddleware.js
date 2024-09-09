const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Replace with a secure key

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
