import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res, next) {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser = await userModel.create({
            firstname,
            lastname,
            email,
            password
        });

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found !" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password !" });
        }

        const payload = { id: user._id, email: user.email };

        // Generating JWT token  -- Whenever sending in header add like this - Bearer JWT <Token>
        const jsonToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });

        res.status(200).send({
            message: "Login Successful!",
            token: jsonToken
        });
    } catch (error) {
        next(error);
    }
}