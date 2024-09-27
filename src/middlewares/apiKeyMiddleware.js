// Middleware to verify API key for admin routes
const verifyAdminApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
        return res.sendStatus(403); // Forbidden if invalid or missing API key
    }

    next(); // API key is valid
};

module.exports = verifyAdminApiKey;
