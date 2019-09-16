const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose.connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => console.log('Mongoose is connected'))
    .catch(err => console.log(err));



app.use('/posts', require('./routes/api/posts'));
app.use('/users', require ('./routes/api/users'));
app.use('/auth', require ('./routes/api/auth'));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is listening port ${port}`)
})