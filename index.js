const express = require("express");
const app=express();
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { DBConnection } = require("./db/db.js");
const User = require("./model/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");



DBConnection()
//1.launching page

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello mod")
})


app.post("/register",async (req,res)=>{
    try {

        const { firstname, lastname, email, password } = req.body;
        console.log(firstname);
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }
         console.log(firstname);
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send("User already exists!");
        }

        // encrypt the password
       const hashedPassword = await bcrypt.hash(password, 10);

        // save the user in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        
        // generate a token for user and send it
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        res
            .status(200)
            .json({ message: "You have successfully registered!", user });


    } catch (error) {
        res,.send
    }
});

//2.app is runnning in port 5000
app.listen(5000,()=>{
    console.log("Port listening to 5000")
})