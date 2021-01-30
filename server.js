//REQUIRING MODULES
const express = require("express");
const app = express();
const cors = require("cors");
const validator = require("./validator");

//ADDING MIDDLEWARES TO THE EXPRESS PROCESSING PIPELINE
app.use(express.json());
app.use(cors());

//ROUTING
//------ROOT ROUTE
app.get("/", (req, res) => {
  const msg = {
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "George Onyeka Nwobodo",
      github: "@Georgedev2",
      email: "nwobodogeorge98@gmail.com ",
      mobile: "07062809435",
    },
  };
  res.json(msg);
});

//lg = console.log;

//------VALIDATION ROUTE
app.post("/validate-rule", (req, res) => {
  const failureResponse = (field) => {
    let msg = {
      message: field,
      status: "error",
      data: null,
    };
    res.status(400).json(msg);
  };

  // Checking for the rule field in the request body
  if (req.body.rule === undefined) {
    failureResponse("rule is required.");
  } else if (typeof req.body.rule === "object") {
    let rule = req.body.rule;

    //Check if any of the fields specified in the rule field is missing
    if (rule.field === undefined) {
      failureResponse("field field is missing from data.");
    } else if (rule.condition === undefined) {
      failureResponse("field condition is missing from data.");
    } else if (rule.condition_value === undefined) {
      failureResponse("field condition_value is missing from data.");
    }
    //
  } else {
    failureResponse("rule should be an object.");
  }

  //Check if the data field in the req.body is EMPTY
  if (req.body.data === undefined) {
    failureResponse("data is required.");
  }

  //Check if the data field is of the right format (ARRAY, OBJECT and STRING)
  if (
    Array.isArray(req.body.data) ||
    typeof req.body.data === "object" ||
    typeof req.body.data === "string"
  ) {
    return validator.validateData(req, res);
  } else {
    return failureResponse(`data is of the right formate`);
  }
});

//SETING PORT NUMBER BASESD ON THE ENVIROMENT THE APP IS RUNNING
const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log(`Input-Validation App  is listening at http://localhost:${port}`);
});
