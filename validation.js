const createSchema = {
    type: "object",
    required: ["name", "userID", "title", "content"],
    properties: {
        name: { type: "string" },
        userID: { type: "number" },
        title: { type: "string" },
        content: { type: "string" }
    },
};

const readSchema = {
    type: "object",
    required: ["userID", "noteID"],
    properties: {
        userID: { type: "number" },
        noteID: {type: "number"}
    },
};
  
const updateSchema = {
    type: "object",
    required: ["userID", "noteID", "content"],
    properties: {
        userID: { type: "number" },
        noteID: { type: "number" },
        content: { type: "string" }
    },
};

const deleteSchema = {
    type: "object",
    required: ["userID", "noteID"],
    properties: {
        userID: { type: "number" },
      noteID: {type: "number"}
    },
  };


const Ajv = require("ajv");
const ajv = new Ajv();
const validateCreate = ajv.compile(createSchema);
const validateRead = ajv.compile(readSchema);
const validateUpdate = ajv.compile(updateSchema);
const validateDelete = ajv.compile(deleteSchema);


module.exports = {validateCreate,validateRead ,  validateUpdate , validateDelete };