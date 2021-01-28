//  REQUIRING MODULES
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.API_PORT || 10000;

//ADDING MIDDLEWARES TO THE EXPRESS PROCESSING PIPELINE
app.use(express.json());
app.use(cors());

//ROUTING
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

app.post("/validate-rule", (req, res) => {
  //The rule and data fields are required.
  let endPointResponse = (field) => {
    let msg = {
      message: field,
      status: "error",
      data: null,
    };
    return msg;
  };

  //When the rule field isn't passed
  if (res.body.rule) {
    res.status(400).json(endPointResponse("rule is required."));
  }

  //When the data field isn't passed
  if (res.body.data) {
    res.status(400).json(endPointResponse("data is required."));
  }

  //If a data field is of the wrong type.
  if (
    typeof res.body.rule == "object" ||
    res.body.rule.length ||
    typeof res.body.rule == "string"
  ) {
    let dataTypeOfData = getDataType();
    res
      .status(400)
      .json(
        endPointResponse(`data should be either string, array or Json Object .`)
      );
  }
  //if the rule field is passed as a number instead of a valid object
  if (typeof res.body.rule !== "object") {
    res.status(400).json(endPointResponse("rule should be an object."));
  }
});

//LISTENING FOR REQUEST AT PORT
app.listen(port, () => {
  console.log(`Input-Validation App  is listening at http://localhost:${port}`);
});
/* 
let getDataType = () => {
    if (typeof res.body.rule == "object") {
      return "object";
    } else if (typeof res.body.rule == "string") {
      return "string";
    } else if (res.body.rule.length) {
      return "array";
    } else {
      return "None";
    }
  }; */
