const express = require("express");
const mongoose = require("mongoose");
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json()); //middleware

// Create an admin user at the starting of the application if not already present

// Connection with mongodb
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });
    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (err) {
    console.log("Error while reading the data", err);
  }

  try {
    user = await user_model.create({
      name: "Saransh",
      userId: "admin",
      email: "saransh2singh@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1", 8),
    });
    console.log("Admin created", user);
  } catch (err) {
    console.log("Error while creating admin", err);
  }
}

require("./routes/auth.routes")(app);
require("./routes/category.routes")(app);

app.listen(server_config.PORT, () => {
  console.log("Server Started at port number : ", server_config.PORT);
});
