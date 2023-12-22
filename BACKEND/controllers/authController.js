import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

// Register Full Controller Function going to Routes files
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    // console.log(salt);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // console.log(hash);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    // console.log(newUser);
    await newUser.save();
    res.status(200).json({
      message: "USER SIGNUP SUCCESSFULLY",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login Full Controller Function going to Routes files

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // if (!user) return res.send("user not found");
    // if (req.body.password !== user.password) {
    //   res.status(400).json({
    //     message : 'INCORRECT PASSWORD',
    //   status : 'failed'
    //   })
    // }else {
    //   res.status(200).send(user)
    // }
    // next(createError(400, "Incorrect email or password"))

    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).json({
        message: "wrong Credientials",
      });
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._id);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json( savedUser._id);
    }
  } catch (error) {
    console.log(error);
  }
};
