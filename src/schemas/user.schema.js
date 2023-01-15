const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

schemaOptions = {
  versionKey: "col_version",
  optimisticConcurrency: true,
  timestamps: true,
  collation: {
    locale: "en_US",
    strength: 1,
    caseLevel: true,
    numericOrdering: true,
  },
};
const userSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone_number: String,
    password: String,
  },
  schemaOptions
);

userSchema.pre("save", async function (next) {
  // hash user password before saving to db
  console.log("hashing password");
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

module.exports = userSchema;
