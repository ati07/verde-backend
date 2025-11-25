import mongoose from "mongoose";
import CollectionReport from "../../models/collectionReport.js";

async function run() {
  await mongoose.connect("mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority");

  const targetDate = new Date("1970-01-01");

  const start = new Date("2025-11-18T00:00:00.000Z");
  const end = new Date("2025-11-19T00:00:00.000Z");

  const res = await CollectionReport.updateMany(
     {
    entryDate: {
      $gte: start,
      $lt: end
    }
  },
    {
      $set: {
        entryDate: null,
        reportDate: null,
        collectionReportDate: null
      }
    }
  );

  console.log("Updated:", res.modifiedCount);
  process.exit(0);
}

run();
