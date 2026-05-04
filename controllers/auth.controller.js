import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { uploadToImgBB } from "../utils/uploadImage.js";
import { generateOTP } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new AppError("Email already in use", 400));
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToImgBB(req.file.buffer);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(user.email, otp);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    if (!user.isVerified) {
      return next(new AppError("Please verify your email first", 400));
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user.otp !== otp) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (user.otpExpire < Date.now()) {
      return next(new AppError("OTP expired", 400));
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (err) {
    next(err);
  }
};
