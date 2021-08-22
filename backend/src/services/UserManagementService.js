const User = require("../models/User");

async function getAllUsers() {
  const details = await User.find({});
  return details;
}
async function fetchAddressDetails(address) {
  console.log("trying to fetch details",address)
  const details = await User.findOne({ address });
  return details;
}
async function addUser(details) {
  try {
    await User.create(details);
    return true;
  } catch {
    return false;
  }
}
async function updateLimit(address,swapLimit){
  const status = await User.findOneAndUpdate({address},{swapLimit})
  return true
}
module.exports = {
  getAllUsers,
  fetchAddressDetails,
  addUser,
  updateLimit
}