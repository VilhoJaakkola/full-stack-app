const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const cors = require('cors');
const driverRouter = require('./routers/driver');
const companyRouter = require('./routers/company');
const vehicleRouter = require('./routers/vehicle');
const journeyRouter = require('./routers/journey');
const userRouter = require('./routers/user');


const app = express();
const port = process.env.PORT || 5000; // Define the port to be used by the server

// Ota käyttöön CORS ennen muita middlewarejä ja reittejä

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies
app.use(driverRouter);
app.use(companyRouter);
app.use(vehicleRouter);
app.use(journeyRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});