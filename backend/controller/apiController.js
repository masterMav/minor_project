const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      username,
      email,
      password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "Username/email already in use.",
      });
    }

    res.json({
      status: "error",
      error: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { username: userEntry, password: plainTextPassword } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: userEntry }, { email: userEntry }],
    }).lean();

    if (!user) {
      return res.json({ status: "error", error: "Username/Email not found." });
    }

    if (await bcrypt.compare(plainTextPassword, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error", error: "Invalid Password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const _id = user.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { _id },
      {
        $set: { password: hashedPassword },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Invalid signature." });
    console.log(error);
  }
};

const sendEmail = async (req, res) => {
  const { email, OTP } = req.body;

  try {
    const user = await User.findOne({ email: email }).lean();

    // Is email already registered?
    if (user) {
      return res.json({ status: "error", error: "Email already in use." });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.SRC_EMAIL,
        pass: process.env.SRC_PASS,
      },
    });

    const options = {
      from: process.env.SRC_EMAIL,
      to: email,
      subject: "[OTP] Email verification.",
      html: `<p>Dear User,</p>
      <p>Your one-time verification code is <b>${OTP}</b>.</p>
      <p>Please enter this code on the verification page to complete the process.</p>
      <p>Please do not share this code with anyone for security purposes.</p>
      <p>Thank you for using our services.</p>
      <p>Best regards,</p>
      <p>Minor project Group.</p>`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        res.json({ status: "error", error: "Invalid email." });
      } else {
        res.json({ status: "ok", data: "Email sent successfully." });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Internal server error." });
  }
};

const updateRank = async (req, res) => {
  const { token, rank, rating } = req.body;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $set: { rank: rank, rating: rating },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Invalid signature." });
    console.log(error);
  }
};

const getRanklist = async (req, res) => {
  User.find({ rank: { $exists: true } }, "username rank rating")
    .then((users) => {
      // _id, username, rank & rating successfully fetched from DB.

      res.json({ status: "ok", users });
    })
    .catch((err) => {
      // fetching errors.

      console.error(err);
      res.json({ status: "error", error: "Internal server error." });
    });
};

const assign = async (req, res) => {
  // retrieve assignment

  const { qn } = req.body;

  // Update the "qns" array for all users

  User.updateMany({}, { $push: { qns: qn } })
    .then((result) => {
      // updated successfully.

      res.json({ status: "ok" });
    })
    .catch((error) => {
      // updation errors

      console.log(error);
      res.json({ status: "error", error: "Internal server error." });
    });
};

const admindata = async (req, res) => {
  User.find({})
    .then((users) => {
      // fetched successfully.

      let count = users.length,
        avgRating = 0;
      users.forEach((user) => {
        if (user.rating !== undefined) avgRating += user.rating;
      });

      if (count !== 0) avgRating /= count;
      let RoundedAvgRating = avgRating.toFixed(2);
      const data = { count, RoundedAvgRating };

      res.json({ status: "ok", data: data });
    })
    .catch((error) => {
      // fetching errors

      console.log(error);
      res.json({ status: "error", error: "Internal server error." });
    });
};

module.exports = {
  register,
  login,
  changePassword,
  sendEmail,
  updateRank,
  getRanklist,
  assign,
  admindata,
};
