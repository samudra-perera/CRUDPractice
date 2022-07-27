const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient



MongoClient.connect('mongodb+srv://BabyYodak:samudra_25S@cluster0.qns0h4d.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.listen(3000, function() {
        console.log('listening on 3000')
      })
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
      })
    
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
      })
  })
  .catch(error => console.error(error))





