import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Register from "../model/register.js";


export const signUp = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password} = req.body;
        console.log(firstname, lastname, username, email, password);
        // check if the email is already registered
        const existingUser = await Register.findOne ({ email });
        if (existingUser) {
            return res.status(400).json({message: "Email is already registered"})
        }
       
        // hash the password
        const hashedPassword = await bcrypt.hash (password, 10);

        // create a new Register/user
        const newUser = new Register ({
           
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
        });

        // save to database
        await newUser.save();

        return res.status(201).json ({message: "user registered succesfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json ({ message: "server error"});
    }
};

    export const signIn = async (req, res) => {
        try {
            const {email, password} = req.body;
            console.log(email, password);


            // find user/register by email
            const user = await Register.findOne ({email});
            if (!user) {
                return res.status(401).json ({ message: "invalid credentials"});
            }

            // check password
            const isPasswordValid = await bcrypt.compare (password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "invalid credentials"});
            }

            // generate a JWT token                             secret code
            const token = jwt.sign ({ userId: user._id }, "JQULYSXL12345", {
            expiresIn: "1h",
        });

        return res.status(200).json ({ token });
        
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error"});
        
    }
};