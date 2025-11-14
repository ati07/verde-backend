import mongoose from "mongoose";
import dotenv from "dotenv";
import {Profitability} from "../models/profitability.js";
// import initialRows from "./data/initialRows.js"; // <-- save your JSON here

dotenv.config();


const initialRows = [
  {
    "id": 1,
    "name": "UNIDADES",
    "budget":'24',
    "budgetPercentage": "",
    "projection": '24',
    "projectionPercentage": "",
    "variation": '0',
    "advance": '24',
    "advancePercentage": "",
    "pending": '0',
    "pendingPercentage": ""
  },
  {
    "id": 2,
    "name": "INGRESOS",
    "budget":'',
    "budgetPercentage": "",
    "projection": '',
    "projectionPercentage": "",
    "variation": '',
    "advance": '',
    "advancePercentage": "",
    "pending": '',
    "pendingPercentage": ""
  },
  {
    "id": 3,
    "name": "Ingresos de Venta",
    "budget": 13530628,
    "budgetPercentage": "100%",
    "projection": 13802421,
    "projectionPercentage": "102%",
    "variation": 271793,
    "advance": 13494754,
    "advancePercentage": "100%",
    "pending": 307667,
    "pendingPercentage": "2%"
  },
  {
    "id": 4,
    "name": "Otros Ingresos (Reembolso Eléctrico)",
    "budget": 0,
    "budgetPercentage": "0%",
    "projection": 0,
    "projectionPercentage": "0%",
    "variation": 0,
    "advance": 0,
    "advancePercentage": "0%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 5,
    "name": "Total de Ventas",
    "budget": 13530628,
    "budgetPercentage": "100%",
    "projection": 13802421,
    "projectionPercentage": "102%",
    "variation": 271793,
    "advance": 13494754,
    "advancePercentage": "100%",
    "pending": 307667,
    "pendingPercentage": "2%"
  },
   {
    "id": 6,
    "name": "COSTOS",
    "budget":'',
    "budgetPercentage": "",
    "projection": '',
    "projectionPercentage": "",
    "variation": '',
    "advance": '',
    "advancePercentage": "",
    "pending": '',
    "pendingPercentage": ""
  },
  {
    "id": 7,
    "name": "Costos Directos",
    "budget": 7636990,
    "budgetPercentage": "100%",
    "projection": 8034022,
    "projectionPercentage": "105%",
    "variation": 397032,
    "advance": 8034022,
    "advancePercentage": "105%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 8,
    "name": "Infraestructura y Amenidades",
    "budget": 1361351,
    "budgetPercentage": "100%",
    "projection": 1529721,
    "projectionPercentage": "112%",
    "variation": 168370,
    "advance": 1529721,
    "advancePercentage": "112%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 9,
    "name": "Total de Costos",
    "budget": 8998341,
    "budgetPercentage": "100%",
    "projection": 9563743,
    "projectionPercentage": "106%",
    "variation": 565402,
    "advance": 9563743,
    "advancePercentage": "106%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 10,
    "name": "Financiamiento Bancario",
    "budget": 7448673,
    "budgetPercentage": "100%",
    "projection": 7448673,
    "projectionPercentage": "100%",
    "variation": 0,
    "advance": 6861721,
    "advancePercentage": "92%",
    "pending": 586952,
    "pendingPercentage": "8%"
  },
  {
    "id": 11,
    "name": "Utilidad Bruta",
    "budget": 4532287,
    "budgetPercentage": "100%",
    "projection": 4238678,
    "projectionPercentage": "94%",
    "variation": -293609,
    "advance": 3931011,
    "advancePercentage": "87%",
    "pending": 307667,
    "pendingPercentage": "7%"
  },
  {
    "id": 12,
    "name": "Regalías Buenaventura",
    "budget": 270613,
    "budgetPercentage": "100%",
    "projection": 342306,
    "projectionPercentage": "126%",
    "variation": 71693,
    "advance": 276048,
    "advancePercentage": "102%",
    "pending": 66258,
    "pendingPercentage": "24%"
  },
  {
    "id": 13,
    "name": "Administración de Proyectos",
    "budget": 529552,
    "budgetPercentage": "100%",
    "projection": 238450,
    "projectionPercentage": "45%",
    "variation": -291102,
    "advance": 238450,
    "advancePercentage": "45%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 14,
    "name": "Administración de Proyectos (OC)",
    "budget": 0,
    "budgetPercentage": "0%",
    "projection": 229131,
    "projectionPercentage": "N/A",
    "variation": 229131,
    "advance": 210984,
    "advancePercentage": "N/A",
    "pending": 18147,
    "pendingPercentage": "N/A"
  },
  {
    "id": 15,
    "name": "Mercadeo y Publicidad",
    "budget": 57260,
    "budgetPercentage": "100%",
    "projection": 76890,
    "projectionPercentage": "134%",
    "variation": 19630,
    "advance": 76890,
    "advancePercentage": "134%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 16,
    "name": "Comisión de Ventas",
    "budget": 506722,
    "budgetPercentage": "100%",
    "projection": 512774,
    "projectionPercentage": "101%",
    "variation": 6052,
    "advance": 240753,
    "advancePercentage": "48%",
    "pending": 272017,
    "pendingPercentage": "54%"
  },
  {
    "id": 17,
    "name": "Diseño",
    "budget": 182102,
    "budgetPercentage": "100%",
    "projection": 182102,
    "projectionPercentage": "100%",
    "variation": 0,
    "advance": 182102,
    "advancePercentage": "100%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 18,
    "name": "Contingencia",
    "budget": 0,
    "budgetPercentage": "0%",
    "projection": 0,
    "projectionPercentage": "0%",
    "variation": 0,
    "advance": 0,
    "advancePercentage": "0%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 19,
    "name": "Otros",
    "budget": 60000,
    "budgetPercentage": "100%",
    "projection": 60000,
    "projectionPercentage": "100%",
    "variation": 0,
    "advance": 60000,
    "advancePercentage": "100%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 20,
    "name": "Total de Gastos",
    "budget": 1606249,
    "budgetPercentage": "100%",
    "projection": 1641653,
    "projectionPercentage": "102%",
    "variation": 35404,
    "advance": 1285225,
    "advancePercentage": "80%",
    "pending": 356421,
    "pendingPercentage": "22%"
  },
  {
    "id": 21,
    "name": "Utilidad Operativa",
    "budget": 2926038,
    "budgetPercentage": "100%",
    "projection": 2597025,
    "projectionPercentage": "89%",
    "variation": -329013,
    "advance": 2645779,
    "advancePercentage": "90%",
    "pending": -48754,
    "pendingPercentage": "-2%"
  },
  {
    "id": 22,
    "name": "Intereses Préstamos Interinos",
    "budget": 239189,
    "budgetPercentage": "100%",
    "projection": 595594,
    "projectionPercentage": "249%",
    "variation": 356405,
    "advance": 595594,
    "advancePercentage": "249%",
    "pending": 0,
    "pendingPercentage": "0%"
  },
  {
    "id": 23,
    "name": "Impuesto / Renta",
    "budget": 338266,
    "budgetPercentage": "100%",
    "projection": 345061,
    "projectionPercentage": "102%",
    "variation": 6795,
    "advance": 223443,
    "advancePercentage": "66%",
    "pending": 121618,
    "pendingPercentage": "36%"
  },
  {
    "id": 24,
    "name": "Utilidad Neta (Flujo)",
    "budget": 2348584,
    "budgetPercentage": "100%",
    "projection": 1656371,
    "projectionPercentage": "71%",
    "variation": -692213,
    "advance": 1826742,
    "advancePercentage": "78%",
    "pending": -170372,
    "pendingPercentage": "-7%"
  }


]

const uploadData = async () => {
  try {
    await mongoose.connect("mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority");
    console.log("MongoDB connected");

    // Clear old data (optional)
    await Profitability.deleteMany();

    // Insert new data
    await Profitability.insertMany(initialRows);
    console.log("Data uploaded successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Error uploading data ❌:", error);
    process.exit(1);
  }
};

uploadData();
