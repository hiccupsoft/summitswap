const Swap = require("../models/Swap");

// controller actions

async function addSwap(emailId, amount, address) {
  try {
    console.log("inside add user");
    const newUser = await Swap.create({
      emailId,
      amount,
      address,
    });
    return true;
  } catch {
    throw "couldn't add new entry";
  }
}

async function getAllSwaps() {
  const details = await Swap.findAll();
  return details;
}

module.exports = {
  addSwap,
  getAllSwaps,
};
