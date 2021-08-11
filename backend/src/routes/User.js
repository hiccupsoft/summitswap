const {Router} = require('express');
const SwapManagementService = require('../services/SwapManagementService');

const router = Router();
router.get('/getAllSwaps', async (req,res)=>{
  try{
      const details = await SwapManagementService.getAllSwaps()
      if(details){
          res.send(details)
      }
      res.status(400).send()
  }catch{
      res.status(500).send()
  }
});

router.get('/getAllUsers', async (req,res)=>{
  try{
      const details = await SwapManagementService.getAllUsers()
      if(details){
          res.send(details)
      }
      res.status(400).send()
  }catch{
      res.status(500).send()
  }
});
router.post('/addSwap', async (req,res)=>{
  try{
      const { emailId,amount,address } = req.body
      const details = await SwapManagementService.addSwap(emailId,amount,address)
      if(details){
          res.send(details)
      }
      res.status(400).send()
  }catch{
      res.status(500).send()
  }
});


