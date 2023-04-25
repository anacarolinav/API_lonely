var express = require("express");
var router = express.Router();
var axios = require('axios');

let loginController = require("../controller/user");
let signupController = require("../controller/Register_user")

router.get("/", (req, res) => {
  res.json({
      rota: "user"
  })

});

router.post("/login", async (req, res) => {
  const resposta = await loginController.login(req);

  if (resposta.success)
    return res.status(200).json({message: resposta.message});
  else if (!resposta.success)
    return res.status(401).json({ message: resposta.message });
  
});

router.post("/signup", async (req, res) => {
  try {
    const result = await signupController.signup(req);
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});



module.exports = router;

