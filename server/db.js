const mongoose = require("mongoose");

main()
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}
