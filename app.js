require('dotenv').config()
const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const PORT = process.env.PORT;
app.use(bodyparser.json());

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) =>{
    res.send('Hello, World!');
})

app.get('/login', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'login.html'))
})

const start = async () => {
    try {
        app.listen(3000, () => console.log('Server has been started on port 3000...'));
    } catch(e) {
        console.log(e)
    }
}

start();