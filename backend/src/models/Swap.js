const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const BigNumber = require("bignumber.js");
const BigNumberSchema = require("mongoose-bignumber");
const { SwapCalls } = require("@material-ui/icons");
const {
  Types: { Long },
} = mongoose;

const swapSchema = new mongoose.Schema(
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
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Swap = mongoose.model("swap", swapSchema);
module.exports = SwapCalls;
