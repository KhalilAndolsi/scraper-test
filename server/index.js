const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ============== Middlewares ==============
app.use(cors());

// ============== Routes ==============
app.get("/", (req, res) => {
  res.status(200).json({
    message: "This Api in development mode!",
    routes: {
      getAllCategories: "/api/v1/categories",
      getProductOfCategory: {
        type: "/api/v1/category/:product-category",
        example: "/api/v1/category/702-ordinateur-portable",
      },
    },
  });
});
app.use("/api/v1/", require("./routes/categories"));

// ============== Port ==============
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
