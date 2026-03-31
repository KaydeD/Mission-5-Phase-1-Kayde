import connectDB from './Database/db.js';
import express from 'express';
import AuctionItem from './AuctionItem/auctionItem.js';

const app = express();
app.use(express.json());

connectDB();

app.get('/api/items', async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      const items = await AuctionItem.find();
      return res.json(items);
    }

    const items = await AuctionItem.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/api/items');
});