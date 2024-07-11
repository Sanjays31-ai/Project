import User from "../models/User.js";

// create user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Successfully Created",
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

// update User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully Updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again",
        });
    }
};

// delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(204).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again",
        });
    }
};

// get single User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const getUser = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "Successfully Got",
            data: getUser,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

// get all User
export const getAllUser = async (req, res) => {
    
    try {
        const getAllUser = await User.find({}) 

        res.status(200).json({
            success: true,
            message: "Successfully Got All",
            data: getAllUser,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};
