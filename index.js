require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises;
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server has been started on PORT = ${PORT}`));
    } catch (e) {
        console.warn(e.message);
    }
}

start();