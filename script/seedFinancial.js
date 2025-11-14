import mongoose from "mongoose";
// import { Financial } from "./models/financial.js"; // adjust path if needed
import { RepaymentAndDisbursements } from "../models/repaymentAndDisbursements.js";

// Screenshot dataset
const financial2024 = {
  year: 2024,
  mensuales: {
    desembolsos: {
      january: 5287326.81,
      february: 88866.87,
      march: 166205.62,
      april: 290974.81,
      may: 558835.03,
      june: 215345.65,
      july: 254177.57,
      august: 198625.53,
      september: 204303.73,
      october: 0,
      november: 0,
      december: 200000.0,
      total: 7464661.62,
    },
    repagos: {
      january: 1079604.1,
      february: 50000.0,
      march: 20000.0,
      april: 25000.0,
      may: 443772.09,
      june: 95770.62,
      july: 743750.28,
      august: 2066362.29,
      september: 1280555.0,
      october: 649512.04,
      november: 190400.0,
      december: 619935.2,
      total: 7264661.62,
    },
  },
  acumulados: {
    desembolsos: {
      january: 5287326.81,
      february: 5376193.68,
      march: 5542399.3,
      april: 5833374.11,
      may: 6392209.14,
      june: 6607554.79,
      july: 6861732.36,
      august: 7060357.89,
      september: 7264661.62,
      october: 7264661.62,
      november: 7264661.62,
      december: 7464661.62,
      total: 7464661.62,
    },
    repagos: {
      january: 1079604.1,
      february: 1129604.1,
      march: 1149604.1,
      april: 1174604.1,
      may: 1618376.19,
      june: 1714146.81,
      july: 2457897.09,
      august: 4524259.38,
      september: 5804814.38,
      october: 6454326.42,
      november: 6644726.42,
      december: 7264661.62,
      total: 7264661.62,
    },
    saldo: {
      january: 4207722.71,
      february: 4246589.58,
      march: 4392795.2,
      april: 4658770.01,
      may: 4773832.95,
      june: 4893407.98,
      july: 4403835.27,
      august: 2536098.51,
      september: 1459847.24,
      october: 810335.2,
      november: 619935.2,
      december: 200000.0,
      total: 200000.0,
    },
  },
};

async function seed() {
  try {
    await mongoose.connect("mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");

    await RepaymentAndDisbursements.deleteMany({});
    console.log("Old data cleared");

    await RepaymentAndDisbursements.create(financial2024);
    console.log("New financial dataset inserted");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.disconnect();
  }
}

seed();
