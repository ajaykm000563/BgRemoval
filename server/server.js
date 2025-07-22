import 'dotenv/config'
import express from "express"
import cors from "cors"
import connectDB from './configs/mongodb.js';
import userrouter from './Routes/userroutes.js';


const port = process.env.PORT || 4000
const app = express();
await connectDB()

//middleware

app.use(express.json())
app.use(cors())



//API
app.get("/", (req, res, next) => {
    res.send("API working")
})

app.use('/api/user',userrouter)

app.listen(port, () => {
    console.log(`server is runnig at port number ${port}`);
})