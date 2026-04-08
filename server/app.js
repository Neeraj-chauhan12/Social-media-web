const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./src/routers/userRouter");
const foodPartnerRouter = require("./src/routers/foodPartnerRouter");
const foodRouter = require("./src/routers/foodRouter");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/db/dbconnection");
const app = express();
const path = require("path");

app.use(
  cors({
    origin: "https://food-app-1-8ys2.onrender.com",

    credentials: true,
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());
app.use(cookieParser());

// deployement
const _dirname = path.resolve();

app.use("/api/auth/user", userRouter);
app.use("/api/auth/food", foodRouter);
app.use("/api/auth/partner", foodPartnerRouter);



app.use(express.static(path.join(_dirname, "/frontend/food/dist")));
app.use((req, res) => {
  res.sendFile(path.join(_dirname, "/frontend/food/dist/index.html"));
});



// db connection and server start
dbConnection();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The app is running ${PORT} port`);
});

module.exports = app;
