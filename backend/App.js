const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:9000/CAIBE", { useNewUrlParser: true });


app.get("/", (req,res)=>{
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
patient_id: Number,
testkey1 : String,
testkey2 : Number,
}), 'Compositions');

app.post('/savejson', (req, res) => {
  const json = req.body
  console.log(json)
  const newComposition = new Compositions({
    patient_id: json.patient_id,
    testkey1: json.testkey1,
    testkey2: json.testkey2
  });
  newComposition.save()
    .then(() => {
      console.log('Composition saved:', newComposition);
      res.send('JSON saved to database');
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred while saving JSON to database');
    });
})

app.get('/getcomposition', (req, res) =>{
  const patientId = req.query.patient_id;
  Compositions.findOne({ patient_id: patientId })
    .then((composition) => {
      if (composition) {
        console.log('Composition found:', composition);
        res.json(composition);
      } else {
        console.log('Composition not found');
        res.send('Composition not found');
      }
    })
    .catch(error => {
      console.log('Error: ', error);
      res.send('An error occurred!');
    });
})

const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

///npm run dev
///state 05.05.