import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies["access token"];

    if (!token) {
        return res
            .status(404)
            .json({ success: false, message: "You are not authorized" });
    }

    // if token exist then verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid Token" });
        }

        req.user = user;
        next(); // calling next function
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res
                .status(401)
                .json({ success: false, message: "You are not authenticated" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res
                .status(401)
                .json({ success: false, message: "You are not authorized ha" });
        }
    });
};
