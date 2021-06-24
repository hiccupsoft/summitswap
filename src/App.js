import logo from "./logo.svg";
import summitLogo from "./assets/summit.svg";
import kodaLogo from "./assets/koda-finance.svg";
import "./App.css";
import ReactPlayer from "react-player";
import Button from "@material-ui/core/Button";
import { useState } from "react";
function App() {
  const [connected, setConnected] = useState(false);
  const connectWallet = async () => {
    window.ethereum.enable();
    setConnected(true);
  };
  return (
    <div className="App">
      <div className="navbar">
        {connected ? (
          <span style={{ margin: "10px" }}>connected •</span>
        ) : (
          <Button variant="contained" color="secondary" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
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
      </div>
    </div>
  );
}

export default App;
