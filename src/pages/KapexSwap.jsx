import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import kodaLogo from "../assets/koda-finance.svg";
import {
  approveKODAforSwap,
  swapKODAForKAPEX,
  balanceOf,
  KAPEX_TOKEN_ADDRESS,
  fetchAddressDetails,
} from "../web3/kodaMethods";
import { useWallet } from "../providers/WalletProvider";
function KapexSwap() {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("xyz@abc.com");
  const [KAPEX, setKAPEX] = useState(0);
  const [isApproved, setIsApproved] = useState();
  const wallet = useWallet();

  const handleApprove = async () => {
    const receipt = await approveKODAforSwap(
      String(amount).toLocaleString("fullwide", { useGrouping: false })
    );
    setIsApproved(true);
  };
  const handleSwap = async () => {
    const receipt = await swapKODAForKAPEX(
      String(amount).toLocaleString("fullwide", { useGrouping: false })
    );
    const balance = await balanceOf(KAPEX_TOKEN_ADDRESS, wallet.account);
    setKAPEX(balance);
    setIsApproved(false);
  };
  useEffect(() => {
    const init = async () => {
      const res = await fetchAddressDetails(wallet.account);
      setEmail(res.emailId);
      setAmount(res.swapLimit);
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
        <h2>SWAP</h2>
        <img style={{ height: "5vh" }} src={kodaLogo} />
        {wallet.status == "connected" ? (
          <div>
            <p
              style={{
                fontSize: "0.8em",
                width: "70%",
                margin: "auto",
                marginBottom: "30px",
              }}
            >
              Major Holder KODA x KODA APEX Swap
            </p>
            <p
              style={{
                fontSize: "0.8em",
                marginBottom: "30px",
              }}
            >
              Hello {email}
            </p>
            <p
              style={{
                fontSize: "0.8em",
                marginBottom: "30px",
              }}
            >
              You are swapping {amount / 1e9} koda for koda apex
            </p>
            Press here to continue
            <br />
            <br />
            <br />
            {isApproved ? (
              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={handleSwap}
              >
                Swap
              </Button>
            ) : (
              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={handleApprove}
              >
                Approve
              </Button>
            )}
            <h4>
              Your KAPEX Balance:{" "}
              {(KAPEX / 1e18)
                .toFixed(2)
                .toLocaleString("fullwide", { useGrouping: false })}
            </h4>
            <div
              className="tnc"
              style={{ textAlign: "left", fontSize: "0.8em" }}
            >
              <h3>Terms and Conditions</h3>
              <p>1. You can only convert once.</p>
              <p>
                2. You can convert upto 50% of your token balance for an account
              </p>
              <p>3. Sale end on YYYY-MM-DD</p>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "50px" }}>
            Please connect wallet to continue
          </div>
        )}
      </div>
    </div>
  );
}

export default KapexSwap;
