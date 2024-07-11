import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Successfully Created",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        // if user doesn't exist
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User Not Found" });
        }

        // if user exist
        const checkCorrectPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        // if incorrect password
        if (!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const { password, role, ...rest } = user._doc;

        // create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        //set token in the browser cookies and send response to client
        res.cookie("access token", token, {
            httpOnly: true,
            expires: token.expiresIn,
        })
            .status(200)
            .json({
                success: true,
                message: "Successfully Logged IN",
                token,
                data: { ...rest },
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to login. Try Again",
        });
    }
};
