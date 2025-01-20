import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

// authUser
// /api/users/login
const authUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body; // frontend la pass panra data va get panrom
    const user = await User.findOne({email}); // email vachu data db la irka nu search pannum
    // console.log(user);

    // user found & db la irukura password aa match panni paakurom [bcrypt]
    if(user && (await user.matchPassword(password))){
    
        generateToken(res,user._id);

        res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
        })
    } else{
        res.status(401);
        throw new Error("Invalid Email Or Password");
    }
});

// @Access Public
// /api/users/
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body; // namma pass panra name,email,password aa get panni vaikrom
    // console.log(name,email,password)

    // email vachu nammaloda data already ulla iruka nu check panrom 
    const userExists = await User.findOne({email});

    // if data iruntha status 400 agirum
    if(userExists){
        res.status(400);
        throw new Error("User Already Exists"); 
    }

    // user ula ilana userModel la create panrom
    const user = await User.create({
        name,
        email,
        password
    });
    
    // user create aachuna new jwt token create aagum 
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
    res.cookie("jwt", "", { // token aa clear panrom..
        httpOnly: true,
        expires: new Date(0), // expire aa date aa reset panrom
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
            isAdmin:user.isAdmin
        })
    }else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @Access Private
// /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("Users UpdateProfile"); // Got UpdateProfile On [Put]
});

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