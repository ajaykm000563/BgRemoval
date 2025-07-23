import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from './configs/mongodb.js';
import { clerkWebHooks } from './controllers/usercontrollers.js';
import userrouter from './Routes/userroutes.js';

const port = process.env.PORT || 4000;
const app = express();
await connectDB();

// ✅ Use raw body ONLY for Clerk webhooks
app.post("/api/user/webhooks", bodyParser.raw({ type: "application/json" }), clerkWebHooks);

// ✅ Then JSON and other middlewares
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
    res.send("API working");
});

// User routes
app.use('/api/user', userrouter);

// Start server
app.listen(port, () => {
    console.log(`server is running at port number ${port}`);
});
