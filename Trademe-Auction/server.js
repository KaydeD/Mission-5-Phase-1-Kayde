import express from "express";
import connectDB from "./Database/db.js";
import AuctionItem from "./AuctionItem/auctionItem.js";

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.get("/items", async (req, res) => {
  const { search } = req.query;

  try {
    if (!search) {
      const all = await AuctionItem.find();
      return res.json({ count: all.length, results: all });
    }

    const results = await AuctionItem.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });

    res.json({ count: results.length, results });
  } catch (error) {
    res.status(500).json({ error: "Search failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/items`);
});