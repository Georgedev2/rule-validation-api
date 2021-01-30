const validateData = (req, res) => {
  const rule = req.body.rule;
  const data = req.body.data;
  const condition = rule.condition;
  const condition_value = rule.condition_value;
  let validate_data_field = processDataField(data, rule);
  let is_value = false;

  switch (condition) {
    case "eq":
      is_value = eq(condition_value, validate_data_field);
      break;
    case "neq":
      is_value = neq(condition_value, validate_data_field);
      break;
    case "gt":
      is_value = gt(condition_value, validate_data_field);
      break;
    case "gte":
      is_value = gte(condition_value, validate_data_field);
      break;
    case "contains":
      is_value = contains(condition_value, validate_data_field);
      break;
    default:
      break;
  }
  if (is_value) {
    return successResponses(rule, data, res);
  } else {
    return errorResponses(rule, data, res);
  }
};

function processDataField(data, rule) {
  const field = rule.field;
  if (typeof data === "string" || Array.isArray(data)) {
    return data[+field];
  } else {
    let validate_data_field = data[field];
    if (field.indexOf(".") !== -1) {
      const field_array = field.split(".");
      validate_data_field = data[field_array[0]][field_array[1]];
    }
    return validate_data_field;
  }
}

function eq(condition_value, value) {
  if (value === condition_value) {
    return true;
  } else {
    return false;
  }
}

function neq(condition_value, value) {
  if (value !== condition_value) {
    return true;
  } else {
    return false;
  }
}

function gt(condition_value, value) {
  if (value > condition_value) {
    return true;
  } else {
    return false;
  }
}

function gte(condition_value, value) {
  if (value >= condition_value) {
    return true;
  } else {
    return false;
  }
}

function contains(condition_value, value) {
  if (value === condition_value) {
    return true;
  } else {
    return false;
  }
}

function successResponses(rule, data, res) {
  let msg = {
    message: `field ${rule.field} successfully validated.`,
    status: "success",
    data: {
      validation: {
        error: false,
        field: rule.field,
        field_value: data[rule.field],
        condition: rule.condition,
        condition_value: rule.condition_value,
      },
    },
  };
  res.json(msg);
}

function errorResponses(rule, data, res) {
  let msg = {
    message: `field ${rule.field} failed validation.`,
    status: "error",
    data: {
      validation: {
        error: true,
        field: rule.field,
        field_value: data[rule.field],
        condition: rule.condition,
        condition_value: rule.condition_value,
      },
    },
  };

  res.status(400).json(msg);
}

//"field 5 is missing from data."
const errorResponse2 = (field) => {
  let msg = {
    message: field,
    status: "error",
    data: null,
  };
  res.status(400).json(msg);
};

module.exports = { validateData };
