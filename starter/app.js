const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

// MIDDLEWARE ----------------------------
app.use(express.static("./public")); // sets up front end
app.use(express.json());

// ROUTES --------------------------------

app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB connection successful");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
// ^^^ we want the DB connection before the server starts listening because the server does no good if we cant connect to the DB.

start();
