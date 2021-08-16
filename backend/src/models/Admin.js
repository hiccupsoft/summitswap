const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const BigNumber = require("bignumber.js");
const BigNumberSchema = require("mongoose-bignumber");
const {
  Types: { Long },
} = mongoose;

const adminSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      min: 6,
      max: 255,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
