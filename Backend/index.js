// const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const userRoute = require('./routes/user-routes')
const inventoryRoute = require('./routes/inventory-routes')
const feedbackRoute = require('./routes/feedback-routes')
const distributionRoute = require('./routes/distribution-routes')
const allocationRoute = require('./routes/allocation-routes')
const donationRoutes = require('./routes/donation-routes')
const analyticsRoute = require('./routes/analytics-routes');
const reportsRoutes = require('./routes/reports.routes')
const movements = require('./routes/movements-routes')
const applicationRoute = require('./routes/applications-routes')
const adminRoute = require('./routes/admin-routes')
const PORT = process.env.PORT || 5000;

const app = express()


// app.use(cors());


app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
// app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api', userRoute);
app.use('/api', inventoryRoute);
app.use('/api', feedbackRoute);
app.use('/api', distributionRoute);
app.use('/api', allocationRoute);
app.use('/api', donationRoutes);
app.use('/api', analyticsRoute);
app.use('/api', reportsRoutes);
app.use('/api', movements);
app.use('/api', applicationRoute);
app.use('/api', adminRoute);






mongoose.connect('mongodb://localhost:27017/sanitary_pads')
    .then(() => app.listen(PORT, () => {
        console.log(`database up on http://localhost:${PORT}`)
        console.log('connected to database')

    }))
    .catch((err) => console.log(err))


