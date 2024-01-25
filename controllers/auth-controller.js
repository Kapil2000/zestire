import User from '../models/user-model.js';
import schedule from '../models/schedule.js';
import Otp from '../models/otp.js';
import nodemailer from 'nodemailer';

// ----resource management form----
const home = async (req, res) => {
  try {
    res.status(200).send("This is Registeration management form home page");
  } catch (error) {
    console.log(error);
  }
};

const createResource = async (req, res) => {
  try {
    console.log(req.body);
    const {
      employeename,
      email,
      website,
      employeeposition,
      joiningdate,
      skills,
      salary,
      rating,
      assigneddeviceid,
      remark,
    } = req.body;
    const userCreated = await User.create({
      employeename,
      email,
      website,
      employeeposition,
      joiningdate,
      skills,
      salary,
      rating,
      assigneddeviceid,
      remark,
    });
    res.status(200).json({ message: userCreated });
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
  }
};

// ----forgot password----
const emailSend = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    mailer(email, otpResponse);
    responseType.statusText = "Success";
    responseType.message =
      "Please check your email OTP is valid for 15 minutes ";
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email id not exist";
  }
  res.status(200).json(responseType);
};

// ----verify otp----
const verifyOtp = async (req, res) => {
  let data = await Otp.find({ code: req.body.otpcode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "OTP Expire";
      response.statusText = "error";
    }
  } else {
    response.message = "Invalid OTP";
    response.statusText = "error";
  }
};

//  ----Change password----
const changePassword = async (req, res) => {
  const response = {};
  let user = await User.findOne({ email: req.body.email });
  user.password = req.body.password;
  user.save();
  response.message = "Password changed successfully";
  response.statusText = "Success";
};

// nodemailer
const mailer = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
  });

  var mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "OTP for forgot password", // Subject line
    text: "Hello world?", // plain text body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// ----schedule call----
const meetingDetails = async (req, res) => {
  try {
    const { name, email, requirement } = req.body;
    const userCreated = await schedule.create({ name, email, requirement });
    res.status(200).json({ message: userCreated });
  } catch (error) {
    res.status(400).json({ msg: "Page not found" });
  }
};

export default {
  home,
  createResource,
  emailSend,
  verifyOtp,
  changePassword,
  meetingDetails,
};
