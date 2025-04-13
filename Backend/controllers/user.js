import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.model.js";
import Admin from "../models/Admin.model.js";
import FoodDonation from "../models/FoodDonation.model.js";
import Retailer from "../models/Retailer.model.js";
import Receiver from "../models/Receiver.model.js";

export const register = async (req, res) => {
  try {

    // Simulate user registration logic
    const { name,type,email, password,  } = req.body;
    console.log(req.body);
    if (!name ||!email|| !password || !type) {
        console.log(req.body);
      return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).json({
          message: "Try different email",
          success: false,
        });
      }
      
      if (user) {
        return res.status(401).json({
          message: "Try different email",
          success: false,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if(type === "Farmer"){
        const newFarmer = await Farmer.create({
          name,
          email,
          password, // make sure it's hashed already
          phoneNumber: "0000000000", // dummy phone
          address: "Default Address",
          location: {
            latitude: 0.0,
            longitude: 0.0,
          },
          crops: [], // optional, so we keep it empty
        });
      }

      else if(type === "Admin"){
        await Admin.create({
          name,
          email,
          password: hashedPassword,
        });
        await Admin.save({ validateBeforeSave: false });
      }
      else if(type === "Donation"){
        const newDonation = await FoodDonation.create({
          name,
          email,
          product,
          quantity,
          message,
          donationDate: new Date(), // set to current time
          location: {
            latitude: 0.0,
            longitude: 0.0,
          },
          
        });
      }
      else if(type === "Retailer"){
        const newRetailer = await Retailer.create({
          name,
          email,
          password, // already hashed ideally
          phoneNumber: "0000000000", // Dummy phone
          location: {
            latitude: 0.0,
            longitude: 0.0,
          },
          inventory: [], // No products at creation
        });
    
      }
      else if(type === "Receiver"){
        const newReceiver = await Receiver.create({
          name,
          email,
          password, // should already be hashed
          phoneNumber: "0000000000", // Dummy phone number
          location: {
            latitude: 0.0, // Default latitude (can be set to your preferred location)
            longitude: 0.0, // Default longitude (can be set to your preferred location)
          },
          requestedItems: [], // No requested items initially
        });
      }
      else{
        return res.status(401).json({
          message: "Invalid user type",
          success: false,
        });
      }
      await User.create({
        name,
        type ,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });


  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req, res) => {
  try {
    // Simulate user login logic
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

   return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const logout = async (_, res) => {
    try {
      return res.cookie("token", "", { maxAge: 0 }).json({
        message: "Logged out successfully.",
        success: true,
      });
    } catch (error) {
      console.log(error);
    }
  };