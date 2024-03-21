const mongoose = require("mongoose");

async function connectToMongoDB() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/url-shortner")
    .then(() => {
      console.log("Connected to mongoDB Succesfully");
    })
    .catch(() => {
      console.log(err, "Failed to connect");
    });
}
module.exports = { connectToMongoDB };
