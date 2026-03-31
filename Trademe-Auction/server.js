import connectDB from "../Database/db.js";
import AuctionItem from "../AuctionItem/auctionItem.js";
import { program } from "commander";

const sampleData = [
  {
    title: "Vintage Guitar",
    description: "A beautiful vintage acoustic guitar from the 1970s",
    start_price: 100,
    reserve_price: 250,
  },
  {
    title: "Mountain Bike",
    description: "Lightly used mountain bike, great condition",
    start_price: 50,
    reserve_price: 150,
  },
  {
    title: "PlayStation 5",
    description: "Brand new PS5 with two controllers",
    start_price: 400,
    reserve_price: 600,
  },
];

const seedData = async () => {
  await connectDB();
  await AuctionItem.insertMany(sampleData);
  console.log("Data seeded successfully!");
  process.exit();
};

const deleteData = async () => {
  await connectDB();
  await AuctionItem.deleteMany({});
  console.log("Data deleted successfully!");
  process.exit();
};

program
  .name("seed")
  .description("CLI tool to manage auction item seed data");

program
  .command("seed")
  .description("Seed the database with sample auction items")
  .action(seedData);

program
  .command("delete")
  .description("Delete all auction items from the database")
  .action(deleteData);

program.parse();