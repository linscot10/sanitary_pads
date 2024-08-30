// const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user-routes')
const inventoryRoute = require('./routes/inventory-routes')
const feedbackRoute = require('./routes/feedback-routes')
const distributionRoute = require('./routes/distribution-routes')
const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json());
// app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api', userRoute);
app.use('/api', inventoryRoute);
app.use('/api', feedbackRoute);

mongoose.connect('mongodb://localhost:27017/sanitary_pads')
    .then(() => app.listen(PORT, () => {
        console.log('database up on http://localhost:3000')
        console.log('connected to database')

    }))
    .catch((err) => console.log(err))


