import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import Button from "@material-ui/core/Button";
import bnbLogo from "../../assets/bnb.svg";
import { IERC20ABI } from "../../abi/IERC20";
import { useWallet } from "../../providers/WalletProvider";
import {getKODAPrice,KODA_TOKEN_ADDRESS,balanceOf} from '../../web3/kodaMethods'
import {Link} from 'react-router-dom'
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
    setConnected(true);
    wallet.setLoadingState(false);
  };
  const disconnectWallet = async () => {
    // await window.ethereum.disable();
    setConnected(false);
  };
  const getExchangeRate = async () => {
    let response = await axios.get(
      "https://api.exchangeratesapi.io/v1/latest?access_key=540ef77de6f40c8a9b7be3efc6434afe"
    );
    const { GBP, USD } = response.data.rates;
    return parseFloat(GBP) / USD;
    // return response.rates.USD/response.rates.GBP
  };
  useEffect(() => {
    const fetchPrice = async () => {
      const priceUSD = await getKODAPrice()
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const rate = await getExchangeRate();
      setPrice(priceUSD);
      setAccount(accounts[0]);
      const _eth = await web3.eth.getBalance(accounts[0]);
      setEth(_eth);
      const balance = await balanceOf(KODA_TOKEN_ADDRESS,accounts[0])
      setKoda(balance);
    };
    if (wallet.status=="connected") {
      fetchPrice();
      setConnected(true)
    }
  }, [wallet]);
  return (
    <div className="navbar">
      <Link to='/'>
      <div style={{float:'left',padding:'20px'}}>Home</div>
      </Link>
      <Link to='/swap'>
      <div style={{float:'left',padding:'20px'}}>KapexSwap</div>
      </Link>
      <Link to='/admin'>
      <div style={{float:'left',padding:'20px'}}>Dashboard</div>
      </Link>
      {connected ? (
        <div className="details">
          <div className="details-box">
            {" "}
            <img style={{ height: "12px", margin: 0 }} src={bnbLogo} /> BSC
          </div>
          <div className="details-box">
            {" "}
            {(koda / 1e18).toFixed(4)} <span className="pink"> KODA </span> ({" "}
            {((koda / 1e18) * price).toFixed(2)}{" "}
            <span className="pink"> GBP </span> )
          </div>
          <div className="details-box">
            {" "}
            {(eth / 1e18).toFixed(4)} <span className="pink"> BNB </span>
          </div>
          <div className="details-box"> {wallet.account} </div>
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
