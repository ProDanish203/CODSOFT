import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try{
        const { username, email, password, role, name } = req.body;

        if(!username) return next("Username is required");
        if(username.includes(" ")) return next("Invalid Username");
        if(!name) return next("Name is required");
        if(!email) return next("Email is required");
        if(!password) return next("Password is required");
        if(password.includes(" ")) return next("Invalid Password. There should not be white spaces");
        if(password.length < 6) return next("Password must be greater than 6 characters.");
        if(!role) return next("User role is required");

        // Checking existing email
        const emailExist = await User.findOne({email});
        if(emailExist) return next("Email aleady in use.");

        // Checking existing username
        const usernameExist = await User.findOne({username});
        if(usernameExist) return next("This username is taken, Please try another one.");

        // Hashing the password
        const hashPass = await bcrypt.hash(password, 10);
        if(!hashPass) return next("Unable to store password");

        // Creating the user
        const user = await User.create({
            username,
            email,
            password: hashPass,
            role,
            name
        })

        res.status(201).send({
            success: true,
            message: "Registered successfully"
        })

    }catch(error){
        next(error);
    }
}

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        if(!username) return next("Username is required");
        if(!password) return next("Password is required");

        const user = await User.findOne({username}).select("_id username password name role");
        if(!user) return next("Invalid credentials");

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) return next("Invalid credentials");

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "24h"});

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login success",
            user,
            token
        })

    }catch(error){
        next("Error: " + error);
    }
}