const Swap = require("../models/Swap");

// controller actions

async function addSwap(emailId, amount, address) {
  try {
    console.log("inside add user");
    const newUser = await User.create({
      emailId,
      amount,
      address,
    });

    return true;
  } catch {
    throw "couldn't create new user";
  }
}
async function getAllUsers() {
  // const details = await User.findAll({ emailId });
  // return details;
}
async function getAllSwaps() {
  const details = await Swap.findAll();
  return details;
}

module.exports = {
  addSwap,
  getAllUsers,
  getAllSwaps,
};
