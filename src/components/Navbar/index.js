import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import Button from "@material-ui/core/Button";
import bnbLogo from "../../assets/bnb.svg";
import { IERC20ABI } from "../../abi/IERC20";
import { useWallet } from "../../providers/WalletProvider";
const TOKEN_ADDRESS = "0x9E993671976a5AC51bBfB3Db9E34eAC8d518fe82";

function Navbar() {
  const [connected, setConnected] = useState(false);
  const [price, setPrice] = useState(0);
  const [eth, setEth] = useState(0);
  const [koda, setKoda] = useState(0);
  const [account, setAccount] = useState("");
  const wallet = useWallet();
  const connectWallet = async () => {
    wallet.setLoadingState(true);
    await wallet.connect();
    if (window.ethereum.isConnected()) {
      setConnected(true);
    }
    wallet.setLoadingState(false);
  };
  const disconnectWallet = async () => {
    // await window.ethereum.disable();
    setConnected(false);
  };
  const getExchangeRate = async () => {
    let response = await axios.get(
      "http://api.exchangeratesapi.io/v1/latest?access_key=9a2024e3a436b3e651e4ed2a2508406f"
    );
    const { GBP, USD } = response.data.rates;
    return parseFloat(GBP) / USD;
    // return response.rates.USD/response.rates.GBP
  };
  useEffect(() => {
    const fetchPrice = async () => {
      let response = await axios.get(
        "https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=0x9E993671976a5AC51bBfB3Db9E34eAC8d518fe82&apikey=ISMIHCDD1TKJ4R3T2X4S76YC8RT9KS2SAG"
      );
      console.log(response.data.result[0].tokenPriceUSD);
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const rate = await getExchangeRate();
      setPrice(response.data.result[0].tokenPriceUSD * rate);
      setAccount(accounts[0]);
      const _eth = await web3.eth.getBalance(accounts[0]);
      setEth(_eth);
      const contractInstance = new web3.eth.Contract(IERC20ABI, TOKEN_ADDRESS);
      const balance = await contractInstance.methods
        .balanceOf(accounts[0])
        .call();
      setKoda(balance);
    };
    if (connected) {
      fetchPrice();
    }
  }, [connected]);
  return (
    <div className="navbar">
      {connected ? (
        <div className="details">
          <div className="details-box">
            {" "}
            <img style={{ height: "12px", margin: 0 }} src={bnbLogo} /> BSC
          </div>
          <div className="details-box">
            {" "}
            {(koda / 1e9).toFixed(4)} <span className="pink"> KODA </span> ({" "}
            {((koda / 1e9) * price).toFixed(2)}{" "}
            <span className="pink"> GBP </span> )
          </div>
          <div className="details-box">
            {" "}
            {(eth / 1e18).toFixed(4)} <span className="pink"> BNB </span>
          </div>
          <div className="details-box"> {account} </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="secondary" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default Navbar;
