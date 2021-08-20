import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import UserTable from "../components/UserTable";
import { getKAPEXTxs } from "../web3/kodaMethods";
function UserDetails() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      // const txs_res = await getKAPEXTxs();
      // console.log(txs_res);
      const txs_res = [
        {
          
        }
      ]
      setTxs(txs_res);
      //TODO parse transactions
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <h1>USER DETAILS</h1>
        <div className="recent-txs">
          <h2>Set Swap limit for KODA</h2>
          <UserTable rows={txs} />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
