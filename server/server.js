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

// 🛑 RAW BODY for Clerk webhooks before any json middleware
app.post("/api/user/webhooks", bodyParser.raw({ type: "*/*" }), clerkWebHooks);

// ✅ THEN apply express.json
app.use(express.json());
app.use(cors());

// API test route
app.get("/", (req, res) => {
    res.send("API working");
});

// other routes
app.use('/api/user', userrouter);

// start server
app.listen(port, () => {
    console.log(`server is running at port number ${port}`);
});
