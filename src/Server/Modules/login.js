const mongoose = require("mongoose");
const { schema } = require("./user");

const Schema = mongoose.Schema;

const loginSchema = schema({
  email: {
    type: String,
    required: true,
  },
});
