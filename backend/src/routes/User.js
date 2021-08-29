const { Router } = require("express");
const SwapManagementService = require("../services/SwapManagementService");
const UserManagementService = require("../services/UserManagementService");

const router = Router();
router.get("/", async (req, res) => {
  console.log("inside status route");
  res.send({ status: "connected" });
});
router.get("/getAllSwaps", async (req, res) => {
  try {
    const details = await SwapManagementService.getAllSwaps();
    if (details) {
      res.send(details);
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const details = await UserManagementService.getAllUsers();
    if (details) {
      res.send(details);
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
router.get("/userDetails", async (req, res) => {
  try {
    const details = await UserManagementService.fetchAddressDetails(
      req.query.address
    );
    if (details) {
      res.send(details);
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
router.post("/addUser", async (req, res) => {
  try {
    const { emailId, address, swapLimit } = req.body;
    console.log({ emailId, address, swapLimit });
    const success = await UserManagementService.addUser({
      emailId,
      address,
      swapLimit,
    });
    if (success) {
      res.send({
        message: "user created succesfully",
      });
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
router.post("/updateLimit", async (req, res) => {
  try {
    const { address,swapLimit } = req.body;
    console.log({ address, swapLimit });
    const success = await UserManagementService.updateLimit(address,swapLimit);
    if (success) {
      res.send({
        message: "limit updated succesfully",
      });
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
router.post("/addSwap", async (req, res) => {
  try {
    const { emailId, amount, address } = req.body;
    const details = await SwapManagementService.addSwap(
      emailId,
      amount,
      address
    );
    if (details) {
      res.send(details);
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
router.post("/login", async (req, res) => {
  try {
    const { emailId, password, address } = req.body;
    const details = await SwapManagementService.login(emailId, amount, address);
    if (details) {
      res.send(details);
    }
    res.status(400).send();
  } catch {
    res.status(500).send();
  }
});
module.exports = router;
