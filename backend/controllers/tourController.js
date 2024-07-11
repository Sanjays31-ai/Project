import Tour from "../models/Tour.js";

// create tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        return res.status(201).json({
            success: true,
            message: "Successfully Created",
            data: savedTour,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully Updated",
            data: updatedTour,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update. Try again",
        });
    }
};

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        return res.status(204).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete. Try again",
        });
    }
};

// get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const getTour = await Tour.findById(id).populate("reviews");

        return res.status(200).json({
            success: true,
            message: "Successfully Got",
            data: getTour,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

// get all tour
export const getAllTour = async (req, res) => {
    // for pagination
    const page = parseInt(req.query.page);

    try {
        const getAllTour = await Tour.find({}) // get 8 tours one at a time
            .populate("reviews")
            .skip(page * 8)
            .limit(8);

        return res.status(200).json({
            success: true,
            count: getAllTour.length,
            message: "Successfully Got All",
            data: getAllTour,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, "i"); // i means case in-sensitive
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const toursBySearch = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize },
        }).populate("reviews");

        return res.status(200).json({
            success: true,
            message: "Successfully got tours by search",
            data: toursBySearch,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

// get featured search
export const getFeaturedTour = async (req, res) => {
    try {
        const toursBySearch = await Tour.find({ featured: true })
            .limit(8)
            .populate("reviews");

        return res.status(200).json({
            success: true,
            message: "Successfully Got Featured Tours",
            data: toursBySearch,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

// get tours count
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        return res.status(200).json({ success: true, data: tourCount });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to fetch" });
    }
};
