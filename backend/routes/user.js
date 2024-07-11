import express from "express";
import {
    deleteUser,
    getAllUser,
    getSingleUser,
    updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// update a User
router.put("/:id", verifyUser, updateUser);

// delete a User
router.delete("/:id", verifyUser, deleteUser);

// get a User
router.get("/:id", verifyUser, getSingleUser);

// get all Users
router.get("/", verifyAdmin, getAllUser);

export default router;
