// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require('express');
const compression = require('compression');
require('express-async-errors');
const logger = require('./server/middleware/logger');
const bodyParser = require('body-parser');
const cors = require('cors');

const taskRouter = require('./server/routes/api');
const error_handler = require('./server/middleware/error_handler');

const port = 8080;
const app = express();

app.use([compression(), express.json(), cors(), bodyParser.json(), logger]);
app.use('/static', express.static('dist'));

app.use('/task', taskRouter);

app.use(error_handler);

app.listen(port, () => {
    console.log("Server started on port", port);
});