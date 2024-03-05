const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const passport = require("./auth");

const sendEmail = require(`./utils/sendEmail`);
const validatePassword = require("./utils/validatePassword");

const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

//mongo connection
mongoose.connect("mongodb://127.0.0.1:27017/iotideDB").then(() => {
  console.log("Connected to MongoDB");
});

//express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors config

//const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

//routes import
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const projectRoute = require("./routes/projectRoute");
const commentRoute = require("./routes/commentRoute");

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/project", projectRoute);
app.use("/comment", commentRoute);

// import model

const User = require(`./models/User`);

passport.use(User.createStrategy());

//jwt secret
const JWTsecret = process.env.JWT_SECRET;
const RefreshSecret = process.env.REFRESH_SECRET;

//Register
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, role } = req.body;

    let password = req.body.password;

    if (!username || !password || !firstName || !role) {
      return res.status(400).json({ error: "Missing required fields" });
      console.log("missing field");
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Username or email already exists" });
      console.log("user exists");
    }

    try {
      await validatePassword(password);
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: `Invalid Password: ${error}` });
    }

    password = await bcrypt.hash(password, 10);

    const newUser = { firstName, lastName, username, password, role };

    const user = new User(newUser);

    await user.save();

    const token = jwt.sign({ username }, JWTsecret, {
      expiresIn: "10m",
    });

    user.verificationToken = token;
    await user.save();

    const mailOptions = {
      user: process.env.MY_EMAIL,
      password: process.env.MY_PASSWORD,
      from: process.env.MY_EMAIL,
      to: username,
      subject: "Please verify your IoTide account.",
      text: `Hi ${firstName},
      Click the following link to verify your email: http://localhost:3000/${role}/emailverified/${token}`,
    };

    try {
      await sendEmail(mailOptions);
      res
        .status(200)
        .json({ message: "User registered. Verification email sent." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

//verify user email

app.get("/verify/:token", async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Check if the token is expired
    const decoded = jwt.verify(token, JWTsecret);

    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res
      .status(200)
      .json({ sucess: true, message: "User verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//login route

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.role === "admin" },
      JWTsecret,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      RefreshSecret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: `Logged in successfully`,
      accessToken,
      refreshToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.username,
      userId: user._id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
  }
});

//forgot password

app.post("/forgotpassword", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with that username!" });
    }

    const token = jwt.sign({ username: username }, JWTsecret, {
      expiresIn: "10m",
    });

    user.resetPasswordToken = token;

    await user.save();

    const mailOptions = {
      user: process.env.MY_EMAIL,
      password: process.env.MY_PASSWORD,
      from: process.env.MY_EMAIL,
      to: username,
      subject: "Please verify your IoTide account.",
      text: `Hi ${user.firstName},
      Click the following link to reset your password: http://localhost:3000/passwordreset/${token}`,
    };

    try {
      await sendEmail(mailOptions);
      return res.status(200).json({ message: "password reset email sent!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

//reset password

app.put("/resetpassword/:token", async (req, res) => {
  let { newPassword } = req.body;

  const resetToken = req.params.token;

  console.log(newPassword);

  try {
    const user = await User.findOne({ resetPasswordToken: resetToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }
    const decodedToken = jwt.verify(resetToken, JWTsecret);

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    try {
      await validatePassword(newPassword);
    } catch (error) {
      console.error(error);
      res.status(422).json({
        error: "Invalid Password Format!",
      });
    }

    newPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    user.resetToken = undefined;

    await user.save();

    let role = user.role;

    if (role === "superadmin") {
      role = "admin";
    }

    return res
      .status(200)
      .json({ role: user.role, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Invalid or expired reset token." });
  }
});

/*
// protected route
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized to access this resource" });
  }
);*/

app.listen(port, () => console.log(`Server running on ${port}`));
