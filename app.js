require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const app = express();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger.json');

const Routes = require('./routes/api');

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
}

const specs = swaggerJSDoc(options);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("App connected to DB")

    })
    .catch(err => {
        console.error("Failed to connect to db");
        console.error(err);
        process.exit(0);
    });

app.use(logger('dev'))

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', Routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/webhook', require('./routes/webhooks'));

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});