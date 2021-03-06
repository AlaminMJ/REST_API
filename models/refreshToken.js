const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
});
module.exports = mongoose.model(
  "refreshTokenSchema",
  refreshTokenSchema,
  "whiteLists"
);
