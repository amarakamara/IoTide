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

//home

app.get("/", (req, res) => {
  res.send(`Welcome to the IoTide!`);
  console.log("I am here");
});
//Register
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const role = "admin";

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

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        success: false,
        message: "Password must meet the required criteria!",
      });
      console.log("bad password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
      Click the following link to verify your email: http://localhost:3000/emailverified/${token}`,
    };

    try {
      await sendEmail(mailOptions);
      res
        .status(200)
        .json({ message: "User registered. Verification email sent." });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Server Error" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Server Error" });
    console.log("Internal server error");
  }
});

//verify user email

app.get("/verify/:token", async (req, res) => {
  const token = req.params.token;

  console.log("This is the token:", token);

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Check if the token is expired
    const decoded = jwt.verify(token, JWTsecret);
    if (Date.now() >= decoded.exp * 1000) {
      return res
        .status(401)
        .json({ success: false, message: "Token has expired" });
    }
    user.isVerified = true;
    console.log("isVerified is set");
    user.verificationToken = undefined;
    console.log("verificationSet");
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User verified successfully!" });
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

    const token = jwt.sign(
      { id: user._id, isAdmin: user.role === "admin" },
      JWTsecret,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `Logged in successfully`,
      token,
      user_id: user._id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server Error" });
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
