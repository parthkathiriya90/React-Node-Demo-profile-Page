import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers or query parameters
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1]

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded data to the request object
        req.query = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Token is invalid or expired
        return res.status(401).json({ message: 'Unauthorized access - Invalid token' });
    }
};

export default authMiddleware;
