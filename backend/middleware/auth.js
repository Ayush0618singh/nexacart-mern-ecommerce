const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided",
            });
        }

        const jwtToken = token.startsWith("Bearer ")
            ? token.split(" ")[1]
            : token;

        const decoded = jwt.verify(
            jwtToken,
            process.env.JWT_SECRET
        );

        // =====================================================
        // NORMALIZE USER ID
        // =====================================================

        const userId =
            decoded.id ||
            decoded._id ||
            decoded.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token. User ID not found",
            });
        }

        // =====================================================
        // SET AUTHENTICATED USER
        // =====================================================

        req.user = {
            ...decoded,
            id: userId,
        };

        console.log("AUTH USER:", req.user);
        console.log("AUTH USER ID:", req.user.id);

        next();

    } catch (error) {

        console.error("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = auth;