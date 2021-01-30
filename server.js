//REQUIRING MODULES
const express = require("express");
const app = express();
const cors = require("cors");
const validator = require("./validator");

//SET PORT NUMBER BASESD ON THE ENVIROMENT THE APP IS RUNNING
const port = process.env.API_PORT || 10000;

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

lg = console.log;

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
    //Checking if any of the fields specified in the rule filed is missing
    let rule = req.body.rule;
    if (rule.field === undefined) {
      failureResponse("field field is missing from data.");
    } else if (rule.condition === undefined) {
      failureResponse("field condition is missing from data.");
    } else if (rule.condition_value === undefined) {
      failureResponse("field condition_value is missing from data.");
    }
  } else {
    failureResponse("rule should be an object.");
  }

  //Check if the data field in the req.body is either be STRING, ARRAY, OR OBJECT
  if (req.body.data === undefined) {
    // if the data field is not in the req.body
    failureResponse("data is required.");
  }

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

//LISTENING FOR REQUEST AT PORT
app.listen(port, () => {
  console.log(`Input-Validation App  is listening at http://localhost:${port}`);
});

//git push heroku main

//heroku logs --tail --app my-rule-validation-app
//heroku logs --tail

//git commit -a -m "added some more changes"