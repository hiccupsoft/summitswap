import Web3 from "web3";
import axios from "axios";
import { KAPEX_SWAP_ABI } from "../abi/KapexSwap";
import { IERC20ABI } from "../abi/IERC20";

export const KAPEX_SWAP_ADDRESS = "0xF31031eAe7d2B8DBB1fE56329F33965b196DCb8b";
export const KAPEX_TOKEN_ADDRESS = "0xCE94EBff1d7F86aa12022Bab141ae7D7581e3Ac4";
export const KODA_TOKEN_ADDRESS = "0x56d4F6F82175caca12166d7F1E605a6d6bb69b76";
export const swapKODAForKAPEX = async (amount) => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const contractInstance = new web3.eth.Contract(
    KAPEX_SWAP_ABI,
    KAPEX_SWAP_ADDRESS
  );
  const receipt = await contractInstance.methods
    .convertKODAtoKAPEX(amount)
    .send({ from:accounts[0] });
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
export const getKODAPrice = async () =>{
  let response = await axios.get(
    "https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=0x9E993671976a5AC51bBfB3Db9E34eAC8d518fe82&apikey=ISMIHCDD1TKJ4R3T2X4S76YC8RT9KS2SAG"
  );
  console.log(response.data.result[0].tokenPriceUSD);
  const web3 = new Web3(window.ethereum);
  return response.data.result[0].tokenPriceUSD 
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