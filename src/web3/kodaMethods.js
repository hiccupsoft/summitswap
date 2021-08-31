import Web3 from "web3";
import axios from "axios";
import { KAPEX_SWAP_ABI } from "../abi/KapexSwap";
import { IERC20ABI } from "../abi/IERC20";
import { KODATIPABI } from "../abi/KODATIP";
export const KAPEX_SWAP_ADDRESS = "0x21a88c9440E6dB6dC7d161d713163b2684bF8d6E";
export const KAPEX_TOKEN_ADDRESS = "0xbaF513d9BDA330a1921092fC8ae6354F70A558FA";
export const KODA_TOKEN_ADDRESS = "0xf1610b0224657ce827be377c60e800eb18a72837";
export const KODA_TIP_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";
export const BACKEND_API_URL = 'https://2d47-106-51-110-29.ngrok.io/'
export const approveKODAforSwap = async (amount) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const kodaInstance = new web3.eth.Contract(IERC20ABI, KODA_TOKEN_ADDRESS);
  const approveReceipt = await kodaInstance.methods
    .approve(KAPEX_SWAP_ADDRESS, amount)
    .send({ from: accounts[0] });
};
export const swapKODAForKAPEX = async (amount) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const contractInstance = new web3.eth.Contract(
    KAPEX_SWAP_ABI,
    KAPEX_SWAP_ADDRESS
  );
  const receipt = await contractInstance.methods
    .convertKODAtoKAPEX(amount)
    .send({ from: accounts[0] });
  console.log(receipt);
};
export const getKAPEXTxs = async () => {
  let response = await axios.get(
    "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0xF31031eAe7d2B8DBB1fE56329F33965b196DCb8b&startblock=0&endblock=999999999&sort=asc&apikey=ISMIHCDD1TKJ4R3T2X4S76YC8RT9KS2SAG"
  );
  return response.data.result.slice(1).reverse();
};
export const balanceOf = async (tokenAddress, from) => {
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(IERC20ABI, tokenAddress);
  const balance = await contractInstance.methods.balanceOf(from).call();
  return balance;
};
export const getKODAPrice = async () => {
  let response = await axios.get(
    "https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=0x9E993671976a5AC51bBfB3Db9E34eAC8d518fe82&apikey=ISMIHCDD1TKJ4R3T2X4S76YC8RT9KS2SAG"
  );
  console.log(response.data.result[0].tokenPriceUSD);
  const web3 = new Web3(window.ethereum);
  return response.data.result[0].tokenPriceUSD;
};
export const createTipWallet = async (amount, username) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const tipInstance = new web3.eth.Contract(KODATIPABI, KODA_TIP_ADDRESS);
  const approveReceipt = await tipInstance.methods
    .createTipWallet(amount, username)
    .send({ from: accounts[0] });
};
export const approveKODAforTip = async (amount) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const kodaInstance = new web3.eth.Contract(IERC20ABI, KODA_TOKEN_ADDRESS);
  const approveReceipt = await kodaInstance.methods
    .approve(KAPEX_SWAP_ADDRESS, amount)
    .send({ from: accounts[0] });
};
export const fetchAddressDetails = async (address) => {
  const details = await axios.get(BACKEND_API_URL+`userDetails?address=${address}`);
  return details.data;
};
export const setSwapLimit = async(address,swapLimit)=>{
  try{
    await axios.post(BACKEND_API_URL+`updateLimit`,{
      address,
      swapLimit
    });
    return true
  }
  catch{
    console.log("something went wrong while updating limit")
  }
}
export const getAllUsers = async() =>{
  try{
    const users = await axios.get(BACKEND_API_URL+`getAllUsers`);
    return users.data
  }
  catch{
    console.log("something went wrong while updating limit")
  }
}
// export const approveTransfer = (amount) =>{
//   const web3 = new Web3(window.ethereum);
//   const accounts = await web3.eth.getAccounts();
//   const contractInstance = new web3.eth.Contract(
//     IERC20ABI,
//     KODA_TOKEN_ADDRESS
//   );
//   const receipt = await contractInstance.methods
//     .convertKODAtoKAPEX(KAPEX_SWAP_ADDRESS,amount)
//     .send({ from:accounts[0] });
//   console.log(receipt);
// }
