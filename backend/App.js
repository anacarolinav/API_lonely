const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;
const app = express();
const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:9000/CAIBE", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'))
})


const UserCredentials = mongoose.model('UserCredentials', new mongoose.Schema({
  userId: { type: ObjectId, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}), 'user_credentials');


// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request with username:', username, 'and password:', password);
  UserCredentials.findOne({ username: username, password: password })
    .then((user) => {
      console.log(user);
      if (user) {
        console.log('User found:', user);
        // Defina o userId do usuário autenticado na sessão ou no token JWT
        const userId = user._id; // Supondo que o _id seja o userId
        req.session.userId = userId; // Exemplo usando sessão
        res.redirect('/dashboard');
      } else {
        console.log('User not found');
        res.send('Invalid username or password!');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
});

// Rota de signup
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received signup request with username:', username, ', email:', email, 'and password:', password);
  const newUserCredentials = new UserCredentials({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password
  });
  newUserCredentials.save()
    .then(() => {
      console.log('User registered:', newUserCredentials);
      // Defina o userId do usuário cadastrado na sessão ou no token JWT
      const userId = newUserCredentials._id; // Supondo que o _id seja o userId
      req.session.userId = userId; // Exemplo usando sessão
      res.redirect('/login');
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
});








app.use(express.json());
const Compositions = mongoose.model('Compositions', new mongoose.Schema({
  composition_id: { type: Number, required: true },
  items: { type: Object, required: true },
  userId: { type: ObjectId, required: true } // Adicione o campo userId para associar a composição ao usuário
}), 'Compositions');


// Rota para salvar a composição
app.post('/savejson', (req, res) => {
  const json = req.body;
  console.log(json);
  const userId = req.session.userId; // Exemplo usando sessão (verifique se o usuário está autenticado e a sessão está configurada corretamente)

  const newComposition = new Compositions({
    composition_id: json["items.0.0.items.0.value"],
    items: json,
    userId: userId // Associe o userId do usuário autenticado à composição
  });

  newComposition.save()
    .then(() => {
      console.log('Composition saved:', newComposition);
      res.send('Composition saved successfully');
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(500).send('An error occurred while saving the composition');
    });
});


// Rota para buscar uma composição específica
app.get('/findjson/:id', (req, res) => {
  const compositionId = req.params.id;
  const userId = req.session.userId; // Exemplo usando sessão (verifique se o usuário está autenticado e a sessão está configurada corretamente)

  Compositions.findOne({ composition_id: compositionId, userId: userId })
    .then((composition) => {
      if (composition) {
        const json = composition.items;
        console.log(json);
        res.send(json);
      } else {
        console.log('Composition not found');
        res.send('Composition not found');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(500).send('An error occurred while fetching the composition');
    });
});


// Rota para buscar todas as composições de um usuário
app.get('/usercompositions', (req, res) => {
  const userId = req.session.userId; // Exemplo usando sessão (verifique se o usuário está autenticado e a sessão está configurada corretamente)

  Compositions.find({ userId: userId })
    .then((compositions) => {
      console.log(compositions);
      res.send(compositions);
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.status(500).send('An error occurred while fetching the compositions');
    });
});


// Rota para buscar todas as composições de todos os usuários (apenas para fins de demonstração)
app.get('/allcompositions', (req, res) => {
  Compositions.find({})
    .then((compositions) => {
      console.log(compositions);
      res.send(compositions);
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.status(500).send('An error occurred while fetching the compositions');
    });
});



const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

///npm run dev
///state 05.05.