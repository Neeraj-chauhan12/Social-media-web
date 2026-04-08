const foodPartnerModel = require("../model/foodPartnermodel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const foodModel = require("../model/foodModel");

exports.foodPartnerRegister = async (req, res) => {
  const { fullName, email, password, phone, address, contactName } = req.body;

  try {
    const userAlreadyExits = await foodPartnerModel.findOne({ email });
    if (userAlreadyExits) {
      return res.status(400).json({ message: "user already exists" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      fullName,
      email,
      password: HashPassword,
      phone,
      address,
      contactName,
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res
      .status(200)
      .json({ message: "user register suuccessfull", foodPartner });
  } catch (error) {
    res.status(500).json({ error: "error in register page", error });
    console.log(error);
  }
};

exports.foodPartnerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({ error: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, foodPartner.password);
    if (!isMatch) {
      return res.status(400).json({ error: "password is not match" });
    }

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(200).json({ message: "login successfull", foodPartner });
  } catch (error) {
    res.status(500).json({ error: "error in login page" });
    console.log(error);
  }
};

exports.foodPartnerLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "error in logout page" });
    console.log(error);
  }
};

exports.getFoodPartnerProfileId = async (req, res) => {
  const { id } = req.params;
  try {
    const foodPartner = await foodPartnerModel.findById(id);
    const foodItems = await foodModel.find({ foodPartner: id });
    if (!foodPartner) {
      return res.status(404).json({ error: "food partner not found" });
    }
    res.status(200).json({
      message: "food partner found",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "error in getting food partner profile" });
    console.log(error);
  }
};
