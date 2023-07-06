const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: [5, "Name must be at least 5 char"],
      maxLength: [20, "Name must be less than 20 char"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Already registered"],
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  jwtToken() {
    return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h",
    });
  },
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
