import mongoose from "mongoose";
import Client from "../../models/client.js";

// Raw client list
const rawClients = `
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
ELAD NISIM MALLEL/NATHALI MORAD
ELAD BEN MEIR
CHEYENNE BEN DOR
LIOR BEN DOR
RAN GOREN
RAN GOREN
TOMER LAHMY
AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
AVI BARANES
AVI BARANES
OFIR PELEG
RAN GOREN
RAN GOREN
YARDEN EREL/GRISBELL LIMA
AVI BARANES
AVI BARANES
AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
ELAD NISIM MALLEL/NATHALI MORAD
YARDEN EREL/GRISBELL LIMA
RAN GOREN
RAN GOREN
RAN GOREN
RAN GOREN
CHEYENNE BEN DOR
ELAD BEN MEIR
LIOR BEN DOR
TOMER LAHMY
OFIR PELEG
TOMER LAHMY
OFIR PELEG
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
ELAD BEN MEIR
AVI BARANES
AVI BARANES
CHEYENNE BEN DOR
OFIR PELEG
ELAD NISIM MALLEL/NATHALI MORAD
AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
LIOR BEN DOR
TOMER LAHMY
YARDEN EREL/GRISBELL LIMA
RAN GOREN
RAN GOREN
RAN GOREN
RAN GOREN
AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
LIOR PERES
ELAD NISIM MALLEL/NATHALI MORAD
OFIR PELEG
CHEYENNE BEN DOR
RAN GOREN
RAN GOREN
RAN GOREN
RAN GOREN
AVI BARANES
AVI BARANES
YARDEN EREL/GRISBELL LIMA
YARDEN EREL/GRISBELL LIMA
TOMER LAHMY
`

// Clean + dedupe + lowercase
const clientNames = [...new Set(
  rawClients
    .split("\n")
    .map(name => name.trim())
    .filter(name => name.length > 0)
    .map(name => name.toLowerCase())
)];

const addedById = new mongoose.Types.ObjectId("67ed771ecb3a950285abf4bd");

async function uploadClients() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect("mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority");

    console.log("Uploading clients...");

    for (const name of clientNames) {
      const existing = await Client.findOne({ name });

      if (existing) {
        console.log(`Skipping (already exists): ${name}`);
        continue;
      }

      await Client.create({
        name,
        addedBy: addedById
      });

      console.log(`Inserted: ${name}`,addedById);
    }

    console.log("Done.");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

uploadClients();


// import mongoose from "mongoose";
// import Client from "../../models/client.js";
// // import Client from "models/client.js"; // adjust path if needed

// // 1. Raw client list
// const rawClients = `
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// ELAD NISIM MALLEL/NATHALI MORAD
// ELAD BEN MEIR
// CHEYENNE BEN DOR
// LIOR BEN DOR
// RAN GOREN
// RAN GOREN
// TOMER LAHMY
// AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
// AVI BARANES
// AVI BARANES
// OFIR PELEG
// RAN GOREN
// RAN GOREN
// YARDEN EREL/GRISBELL LIMA
// AVI BARANES
// AVI BARANES
// AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
// ELAD NISIM MALLEL/NATHALI MORAD
// YARDEN EREL/GRISBELL LIMA
// RAN GOREN
// RAN GOREN
// RAN GOREN
// RAN GOREN
// CHEYENNE BEN DOR
// ELAD BEN MEIR
// LIOR BEN DOR
// TOMER LAHMY
// OFIR PELEG
// TOMER LAHMY
// OFIR PELEG
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// ELAD BEN MEIR
// AVI BARANES
// AVI BARANES
// CHEYENNE BEN DOR
// OFIR PELEG
// ELAD NISIM MALLEL/NATHALI MORAD
// AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
// LIOR BEN DOR
// TOMER LAHMY
// YARDEN EREL/GRISBELL LIMA
// RAN GOREN
// RAN GOREN
// RAN GOREN
// RAN GOREN
// AVRAHAM REUVEN PRICE/NOVOA PRIVA PRICE
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// LIOR PERES
// ELAD NISIM MALLEL/NATHALI MORAD
// OFIR PELEG
// CHEYENNE BEN DOR
// RAN GOREN
// RAN GOREN
// RAN GOREN
// RAN GOREN
// AVI BARANES
// AVI BARANES
// YARDEN EREL/GRISBELL LIMA
// YARDEN EREL/GRISBELL LIMA
// TOMER LAHMY
// `;

// // 2. Clean + dedupe
// const clientNames = [...new Set(
//   rawClients
//     .split("\n")
//     .map(n => n.trim())
//     .filter(n => n.length > 0)
// )];

// async function uploadClients() {
//   try {
//     console.log("Connecting to MongoDB...");
//     await mongoose.connect("mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority");

//     console.log("Uploading clients...");
//     for (const name of clientNames) {
//       const existing = await Client.findOne({ name });

//       if (existing) {
//         console.log(`Skipping (already exists): ${name}`);
//         continue;
//       }

//       await Client.create({
//         name,
//         addedBy: null, // or replace with a user ID
//       });

//       console.log(`Inserted: ${name}`);
//     }

//     console.log("Done.");
//     process.exit();
//   } catch (err) {
//     console.error("Error:", err);
//     process.exit(1);
//   }
// }

// uploadClients();



