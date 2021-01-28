//  REQUIRING MODULES
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.API_PORT || 10000;

//ADDING MIDDLEWARES TO THE EXPRESS PROCESSING PIPELINE
app.use(express.json());
app.use(cors());

//ROUTING
app.get("/", () => {});

//LISTENING FOR REQUEST AT PORT
app.listen(port, () => {
  console.log(`Input-Validation App  is listening at http://localhost:${port}`);
});
