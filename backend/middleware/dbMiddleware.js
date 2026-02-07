import connectDB from "../config/db.js";

const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({ message: "Database connection failed", error: error.message });
    }
};

export default dbMiddleware;
