const router = require("express").Router();
const { categories, products } = require("../utils/scraper")

router.get("/categories", async (req, res) => {
  try {
    const data = await categories()
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error})
  }
})
router.get("/category/:category", async (req, res) => {
  try {
    const page = req.query.page || 1
    const { category } = req.params;    
    const data = await products(`https://www.tunisianet.com.tn/${category}?page=${page}`)
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err})
  }
})


module.exports = router