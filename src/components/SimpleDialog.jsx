import { Button, TextField, Dialog, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import { useWallet } from "../providers/WalletProvider";
import { setSwapLimit } from "../web3/kodaMethods";
export default function SimpleDialog({ onClose, address, open }) {
  const [limit, setLimit] = useState(0);
  const handleClose = () => {
    onClose(address);
  };
  const wallet = useWallet()
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className="swap-dalog-box">
        <DialogTitle id="simple-dialog-title">
          Set Swap Limit for <br /> {address}
        </DialogTitle>
        <div className="swap-dialog">
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
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
          <br/>
          <Button
            variant="contained"
            color="secondary"
            onClick={async () => {
              await setSwapLimit(address, limit);
              wallet.setUpdateFlag();
              handleClose();
            }}
            style={{
              marginTop:'25px'
            }}
          >
            Set Limit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
