import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import UserTable from "../components/UserTable";
import { getAllUsers } from "../web3/kodaMethods";
function UserDetails() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users_res = await getAllUsers();
      setUsers(users_res);
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
          <UserTable rows={users} />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
