import express from "express";
import mongoose from "mongoose";
import errorRoutes from "./middlewares/errorRoutes.middleware.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import dotenv from "dotenv"
import cartRouter from "./routes/cart.route.js";
import verifyJwtToken from "./middlewares/verifyJwtToken.middleware.js";

// Loading environment variables from .env file
dotenv.config();

export const server = new express();
const PORT = process.env.PORT || 3000;

// Middlewares

// Middleware to parse req body json data 
server.use(express.json());

// Creating a base path for the routers so that we can achieve separation of concerns
server.use("/users", userRouter);
server.use("/products", productRouter);
server.use("/cart", cartRouter)

// Common middlesware for handling errors
server.use(errorRoutes);

// Connecting to MongoDB Instance
mongoose
    mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
    .then(() => console.log("Database Connection Successfull !"))
    .catch(error => console.log("Database Connection Failed !"));

server.listen(PORT, () => {
    console.log("Hey listening to port", PORT);
});