import mongoose from "mongoose";
import xlsx from "xlsx";
import Client from "../../models/client.js";
import Project from "../../models/project.js";
import CollectionReport from "../../models/collectionReport.js";

const FILE_PATH = "./cobros.xlsx";

// use real mongoose ObjectId
const addedBy = new mongoose.Types.ObjectId("67ed771ecb3a950285abf4bd");

async function runImport() {
  try {
    await mongoose.connect(
      "mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DB");

    const workbook = xlsx.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(`Loaded ${rows.length} rows from Excel`);

    for (const row of rows) {
      const clientName = row.client?.trim().toLowerCase();
      const projectName = row.project?.trim().toLowerCase();

      if (!clientName || !projectName) {
        console.log(`Skipping row (missing client/project):`, row);
        continue;
      }

      const client = await Client.findOne({ name: clientName });
      if (!client) {
        console.log(`Client not found: ${clientName}`);
        continue;
      }

      const project = await Project.findOne({ name: projectName });
      if (!project) {
        console.log(`Project not found: ${projectName}`);
        continue;
      }

      const reportDate = row.reportDate ? new Date(row.reportDate) : null;
      const paymentDate = row.paymentDate ? new Date(row.paymentDate) : null;

      const cleanTotal =
        typeof row.totalCollection === "string"
          ? Number(row.totalCollection.replace(/,/g, ""))
          : row.totalCollection;

      const payload = {
        clientId: new mongoose.Types.ObjectId(client._id),
        projectId: new mongoose.Types.ObjectId(project._id),
        unitName: row.unitName?.toString() || "",
        // reportDate: reportDate || null,
        totalCollection: cleanTotal?.toString() || "",
        typeOfPayment: row.typeOfPayment || "",
        observation: row.observation || "",
        paymentDate: paymentDate || null,
        // collectionReportDate: reportDate || null,
        // entryDate: new Date(),
        addedBy,            // <-- added here
        isComplete: false,
        isDelete: false,
        isActive: true,
      };

      await CollectionReport.create(payload);

      console.log("payload", payload);
      console.log(
        `Inserted for client ${clientName} / unit ${row.unitName}`
      );
    }

    console.log("Import finished.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runImport();
