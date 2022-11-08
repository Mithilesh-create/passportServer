const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
