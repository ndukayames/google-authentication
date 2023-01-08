const mongoose = require("mongoose");

dbOptions = {
  dbName: "ums",
  keepAliveInitialDelay: 300000,
  family: 4,
  loggerLevel: "debug",
  appname: "user management app",
};
async function main() {
  try {
    mongoose.set("strictQuery", true);
    let connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/ums",
      dbOptions
    );
    console.log(
      `mongodb connection succeeded with host - ${connection.connection.host} & db name - ${connection.connection.name}`
    );
    // console.log(connection.connection);
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;
