import express from "express";
import { clerkWebHooks } from "../controllers/usercontrollers.js";

const userrouter = express.Router();

userrouter.post("/webhooks", clerkWebHooks)

export default userrouter;