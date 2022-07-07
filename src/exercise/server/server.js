const express = require("express");
const compression = require("compression");
require("express-async-errors");
const logger = require("./middleware/logger");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskRouter = require("./routes/api");

const port = 8080;
const app = express();

app.use([compression(), express.json(), cors(), bodyParser.json(), logger]);
// app.use('/static', express.static('dist'));

app.use("/task", taskRouter);

app.listen(port, () => {
  console.log("Server started on port", port);
});
