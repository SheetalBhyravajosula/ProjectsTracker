const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSecurity = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    securityQuestion: {
      type: String,
      required: true,
    },
    securityAnswer: {
      type: String,
      required: true,
    },
  },
  { collection: "UserSecurityQA" }
);

module.exports = mongoose.model("UserSecurityQA", userSecurity);
