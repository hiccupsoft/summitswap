import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import TransactionTable from "../components/TransactionTable";
import { getKAPEXTxs } from "../web3/kodaMethods";
function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      const txs_res = await getKAPEXTxs();
      console.log(txs_res);
      setTxs(txs_res);
      //TODO parse transactions
    };
    fetchTransactions();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <h1>KAPEX DASHBOARD</h1>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <p
              style={{
                fontSize: "5em",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              00
            </p>{" "}
            KODA HOLDERS
          </Grid>
          <Grid item sm={6} xs={12}>
            <p
              style={{
                fontSize: "5em",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              00
            </p>{" "}
            KAPEX HOLDERS
          </Grid>
        </Grid>
        <div className="recent-txs">
          <h2>Recent Transactions</h2>
          <TransactionTable rows={txs} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
