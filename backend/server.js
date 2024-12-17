const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const PORT = process.env.PORT;
const app = express();
let cors = require("cors");

app.use(cors());
// Connect to the database
connectDB();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// user routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/entries", require("./routes/entryRoutes"));
app.use("/api/allentries", require("./routes/allentryRoutes"));
app.use("/api/avatar", require("./routes/avatarRoutes"));
app.use("/uploads", express.static("././frontend/src/components/uploads/"));
// serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => res.status(200).json({ message: "Welcome!" }));
}
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
