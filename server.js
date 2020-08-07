const express = require("express");

const app = express();
const connectDB = require("./config/db");

//connect to MongoDB
connectDB();

// Middleware init
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
