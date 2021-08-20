import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import kodaLogo from "../assets/koda-finance.svg";
import {
  approveKODAforSwap,
  swapKODAForKAPEX,
  balanceOf,
  KAPEX_TOKEN_ADDRESS,
} from "../web3/kodaMethods";
import { useWallet } from "../providers/WalletProvider";
import { useHistory } from "react-router-dom";
function KapexSwap() {
  const [email, setEmail] = useState("xyz@abc.com");
  const [password, setPassword] = useState("password");
  const [KAPEX, setKAPEX] = useState(0);
  const [isApproved, setIsApproved] = useState();
  const wallet = useWallet();
  const history = useHistory();
  // const handleApprove = async ()=>{
  //   const receipt = await approveKODAforSwap(String(amount * 1e9).toLocaleString("fullwide", { useGrouping: false }));
  //   setIsApproved(true)
  // }
  const handleLogin = async () => {
    if(email=="test@example.com"&&password=="password"){
      history.push('/admin')
    }
    console.log("logged in");
  };
  useEffect(() => {
    const init = async () => {
      const balance = await balanceOf(KAPEX_TOKEN_ADDRESS, wallet.account);
      console.log("KAPEX: ", balance);
      setKAPEX(balance);
    };
    if (wallet.status == "connected") {
      init();
    }
  });
  return (
    <div>
      <Navbar />
      <div className="swap-box">
        <h2>LOGIN</h2>
        <img style={{ height: "5vh" }} src={kodaLogo} />
        <p
          style={{
            fontSize: "0.8em",
            width: "60%",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          Login to see all transactions
        </p>
        <br />
        <TextField
          size="small"
          style={{
            width: "50%",
            borderRadius: "10px",
            height: "35px",
            margin: "auto",
          }}
          label=""
          variant="outlined"
          InputLabelProps={{ className: "text-label" }}
          InputProps={{ className: "input-field" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          size="small"
          style={{
            width: "50%",
            borderRadius: "10px",
            height: "35px",
            margin: "auto",
          }}
          label=""
          variant="outlined"
          type="password"
          InputLabelProps={{ className: "text-label" }}
          InputProps={{ className: "input-field" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>
      </div>
    </div>
  );
}

export default KapexSwap;
