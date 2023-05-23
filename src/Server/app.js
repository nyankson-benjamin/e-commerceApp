const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
var localStorage = require("localStorage");
require("dotenv").config();
// const Objectid = require("mongo-objectid");
const app = express();
const User = require("./Modules/user");
const Cart = require("./Modules/cart");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// const ObjectId = new Objectid();
// MongoDB Connection
const dbURI = process.env.DB_URL_NEW;

const client = new MongoClient(dbURI);
const db = client.db("shop"); // Replace with your database name

// Endpoint to fetch data from MongoDB
app.get("/api/users", async (req, res) => {
  try {
    await client.connect();
    const collection = db.collection("users"); // Replace with your collection name
    const data = await collection.find().toArray();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user/register", async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      contact,
      password,
      confirmPass,
      otp,
      country,
      isVerified,
      role,
      isAdmin,
    } = req.body;

    // console.log("first", req.body);
    const user = new User({
      fname,
      lname,
      email,
      contact,
      password,
      confirmPass,
      otp,
      country,
      isVerified,
      role,
      isAdmin,
    });

    const checkuser = await db.collection("users").findOne({ email: email });

    if (checkuser === null) {
      db.collection("users").insertOne(user);
    } else {
      res.status(409).send("Email already exists");
    }
    res.status(201).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products", async (req, res) => {
  try {
    await client.connect();
    // const db = client.db("shop"); // Replace with your database name
    const collection = db.collection("products"); // Replace with your collection name
    const data = await collection.find().toArray();
    // console.log(data);
    console.log(localStorage.getItem("userDetails"));
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/confirm", async (req, res) => {
  const { code } = req.body;
  try {
    const userOtp = await db.collection("users").findOne({ otp: code });
    // console.log(code);

    if (userOtp === null) {
      res.status(500).send("Internal Server Error");
    } else {
      await db
        .collection("users")
        .updateOne(
          { _id: userOtp._id },
          { $set: { otp: "", isVerified: true } }
        );
      res.status(201).json({ mesage: "Otp confirmed successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const loginCredentials = await db
    .collection("users")
    .findOne({ email: email });

  if (loginCredentials === null) {
    res.status(404).send(`Email does not exist`);
  } else if (password !== loginCredentials.password) {
    res.status(409).send("Wrong Credentials");
  } else if (loginCredentials.isVerified === false) {
    res.status(401).send("verify email");
  } else if (password === loginCredentials.password) {
    res.status(200).json({ mesage: "Login success", data: loginCredentials });
  } else {
    res.status(500).json({ mesage: "Login failed" });
    // res.json(loginCredentials);
  }
});

app.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;
  const user = await db.collection("users").findOne({ email: email });
  if (user === null) {
    res.status(404).send(`Email not found`);
  } else if (user) {
    res.status(200).json({ mesage: "Email found" });
    localStorage.setItem("email", JSON.stringify(user.email));
  }
});

app.post("/resetPassword", async (req, res) => {
  const { password, confirmPass } = req.body;

  const email = JSON.parse(localStorage.getItem("email"));
  try {
    const user = await db.collection("users").findOne({ email: email });

    if (user === null) {
      res.status(404).send(`Request for a password reset first`);
    } else {
      db.collection("users").updateOne(
        { _id: user._id },
        { $set: { password: password, confirmPass: confirmPass } }
      );
      res.status(201).json({ mesage: "Password changed successfully" });
      localStorage.removeItem("email");
    }
  } catch (error) {}
});

app.post("/addtocart", async (req, res) => {
  const { unitPrice, item, image, quantity, email, totalPrice } = req.body;
  const carts = new Cart({
    unitPrice,
    item,
    image,
    quantity,
    email,
    totalPrice,
  });
  const user = await db.collection("users").findOne({ email: email });
  let existingItem;
  let existingPrice;
  try {
    user?.cart.forEach((item) => {
      existingItem = item.item;
      existingPrice = item.totalPrice;
    });

    if (item === existingItem && totalPrice === existingPrice) {
      res.status(404).send(`Item already exist`);
    } else if (item === existingItem && totalPrice !== existingPrice) {
      res.status(201).json({ message: "update price" });
    } else {
      db.collection("users").updateOne(
        { _id: user._id },
        { $push: { cart: carts } }
      );
      res.status(201).json({ mesage: "product added successfully" });
    }
  } catch (error) {
    res.status(409).json({ mesage: "cant add" });
  }
});
const ObjectID = require("mongodb").ObjectId;
app.get("/cart", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectID(id) });
    res.json({ cart: user?.cart });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: "Could not fetch cart" });
  }
});

app.delete("/delete/cartItem", async (req, res) => {
  const { userId, itemId } = req.query;

  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectID(userId) });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const itemIndex = user.cart.filter((cartItem) => cartItem._id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    user.cart.splice(itemIndex, 1);

    await db
      .collection("users")
      .updateOne({ _id: new ObjectID(userId) }, { $set: { cart: user.cart } });

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the cart item" });
  }
});

app.post("item/update", (req, res) => {});
module.exports = app;
