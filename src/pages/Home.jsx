import React from "react";
import ReactPlayer from "react-player";
import summitLogo from "../assets/summit.svg";
import kodaLogo from "../assets/koda-finance.svg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
function Home() {
  return (
    <div>
      <Navbar />
      <div className="top-logo">
        <img style={{ height: "8vh" }} src={summitLogo} />
        <h4>- Summit Swap in Development -</h4>
      </div>
      <div className="video">
        <ReactPlayer
          style={{ margin: "auto" }}
          url="https://www.youtube.com/watch?v=Ja9-N3UfRQ8"
        />
      </div>
      <div className="bottom-image">
        <img style={{ height: "10vh" }} src={kodaLogo} />
        <a href="https://koda.finance/">
          <p>Visit Koda Finance</p>
        </a>
      </div>
    </div>
  );
}

export default Home;
