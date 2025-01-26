import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs"


// authUser
// /api/users/login
const authUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body; 
    const user = await User.findOne({email});
    // console.log(user);

    if(user && (await user.matchPassword(password))){
    
        generateToken(res,user._id);

        res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
        });
    } else{
        res.status(401);
        throw new Error("Invalid Email Or Password");
    }
});


// @Access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(name,email,password)

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists"); 
    }

    const user = await User.create({
        name,
        email,
        password
    });
    
    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    } else{
        res.status(400);
        throw new Error("Invalid User Data");
    }

});

// @Access Private
// /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), 
    });

    res.status(200).json({message:"Logged out successfully"});
});


// @Access Public
// /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            // password:user.password,
            isAdmin:user.isAdmin
        })
    }else {
        res.status(404);
        throw new Error("User not found");
    }
});


/// @Access Private
// /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;
    
    if (email) {
        if (!validateEmail(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }
        user.email = email;
    }

    if (password) {
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters' });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    console.log(user);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password:user.password,
        message: "Profile updated successfully",
    });
});


const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};



// @Access Public
// /api/users
const getUsers = asyncHandler(async (req, res) => {
    res.send("Users GetUsers"); // Got Users On [Get]
});

// @Access Public
// /api/users/:id
const getUserByID = asyncHandler(async (req, res) => {
    res.send("Users GetUserByID")  // Got UserID On [Get]
});

// @Access Private
// /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Users DeleteUser") // Got DeleteUser On [Delete]
});

// @Access Private
// /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
    res.send("Users UpdateUser") // Got UpdateUser On [Put]
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}