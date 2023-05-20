const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:9000/CAIBE", { useNewUrlParser: true });


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const UserCredentials = mongoose.model('UserCredentials', new mongoose.Schema({
  _id: ObjectId,
  username: String,
  email: String,
  password: String
}), 'user_credentials');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request with username:', username, 'and password:', password);
  UserCredentials.findOne({ username: username, password: password })
    .then((user) => {
      console.log(user)
      if (user) {
        console.log('User found:', user);
        res.redirect('/dashboard')
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
      res.redirect('/login')
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
});

app.use(express.json());
const Compositions = mongoose.model('Compositions', new mongoose.Schema({
  composition_id: Number,
  items: Object

}), 'Compositions');


//to save the excel as a composition in mongo when the doctor makes the upload of the excel
app.post('/savejson', (req, res) => {
  const json = req.body;
  console.log(json);
  const newComposition = new Compositions({
    composition_id:json['items.0.0.items.O.value'].id,
    items: json

  });
  newComposition.save()
    .then(() => {
      console.log('Composition saved:', newComposition);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred while saving JSON to database');
    });
})


//to get only one composition for the patient with the number that the doctor searches for
app.get('/findjson/:id', (req, res) => {
  const Id = req.params.id;

  Compositions.findOne({ composition_id: Id })

    .then((composition) => {
      if (composition) {
        const json = composition.items;
        console.log(json);
        res.send('Fetched com sucesso!');
      } else {
        console.log('Documento não encontrado');
        res.send('Documento não encontrado');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('Ocorreu um erro ao buscar o JSON');
    });
});

//to get all the compositions saved in our db
/*
app.get('/alljson', (req, res) => {
  Compositions.find({})
    .select('composition_id')
    .then((compositions) => {
      if (compositions.length > 0) {
        const compositionIds = compositions.map((composition) => composition.composition_id);
        console.log(compositionIds);
        res.send('Fetched com sucesso!');
      } else {
        console.log('Nenhuma composição encontrada');
        res.send('Nenhuma composição encontrada');
      }
    })
    .catch((error) => {
      console.log('Erro: ', error);
      res.send('Ocorreu um erro ao buscar as composições');
    });
});
*/

app.get('/alljson', (req, res) => {
  Compositions.find({})
    .then((compositions) => {
      if (compositions.length > 0) {
        console.log(compositions);
        res.send(compositions);
      } else {
        console.log('Nenhuma composição encontrada');
        res.send('Nenhuma composição encontrada');
      }
    })
    .catch((error) => {
      console.log('Erro: ', error);
      res.send('Ocorreu um erro ao buscar as composições');
    });
});


const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

///npm run dev
///state 05.05.