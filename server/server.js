const app = require("./app");
const db = require("./src/config/db");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
