import Booking from "../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    
    try {
        const savedBooking = await newBooking.save();
        return res.status(200).json({
            success: true,
            message: "Your Tour is Booked",
            data: savedBooking,
        });
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        return res
            .status(200)
            .json({ success: true, message: "successful", data: book });
    } catch (error) {
        return res.status(404).json({ success: false, message: "Not Found" });
    }
};

// get all booking
export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.findById({});

        return res
            .status(200)
            .json({ success: true, message: "successful", data: books });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
