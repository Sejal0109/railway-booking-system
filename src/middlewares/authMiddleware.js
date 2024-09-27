const jwt = require('jsonwebtoken');

// Middleware to authenticate users using JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.sendStatus(401); // No token found
    }

    try {
        const extractedToken = token.split(' ')[1];
        // console.log('Verifying Token:', extractedToken);
        
        // Simply decode the token without verification (for debugging purposes)
        const decoded = jwt.decode(extractedToken);
        // console.log('Decoded Token (without verification):', decoded);
        // console.log('Expected Secret:', process.env.JWT_SECRET);

        if (!decoded) {
            throw new Error('Failed to decode token');
        }

        req.user = decoded;  // Attach decoded info (userId) to the request
        next();  // Proceed to the next middleware/controller
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateToken;
