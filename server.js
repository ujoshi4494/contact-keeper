const express = require("express");

const app = express();

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
