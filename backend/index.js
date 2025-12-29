import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});