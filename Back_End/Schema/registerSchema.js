const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});


registerSchema.pre("save", async function (next) {
  try {
    // console.log(`THIS VALUE: ${this}`)
    const data = this;
    if (!data.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(this.password, salt);
    this.password = hash_pass;
  } catch (error) {
    next(error);
  }
});


registerSchema.methods.genJWTtoken = async function () {
  const key = "blogdatatoken";
  try {
    return jwt.sign(
      
      {
        username: this.username,
        userID: this._id.toString(),
        email: this.email,
        phoneNumber: this.phoneNumber,
        gender: this.gender,
        isAdmin: this.isAdmin,
      },
      key,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const dbSchema = new mongoose.model("Blog_User", registerSchema);
module.exports = dbSchema;