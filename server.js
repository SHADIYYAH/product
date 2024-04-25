require("dotenv").config();
const connect = require("./src/config/database");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const displayRoutes = require("express-routemap");
const userRoute = require("./src/router/user");
const { welcomeMessage } = require("./src/constants/messages");
const messages = require("./src/constants/messages");
const port = process.env.PORT;

//middlewares
app.use(bodyParser.json())
app.use(cors());
app.use("/api/v1/user", userRoute);
app.get("/", (req, res) => {
   return res.status(200).json({
    status:true, 
    message: "Hello world!"
   })
  });

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Sorrry, you're lost",
  });
});
app.listen(port, async () => {
  await connect().then(() => {
    console.log(`Database connected`);
  });
  console.log(`Server is running on port http://localhost:${port}`);
});
