import axios from 'axios'
import xlsx from 'xlsx'
import { formatString } from '../helper.js';
import fs from 'fs';
// import Inventory from '../../models/inventory.js';
import mongoose from 'mongoose';
import Code from '../../models/code.js';
import SubPhase from '../../models/subPhase.js';

let codeOption = [
    "263-01",
    "263-02",
    "263-03",
    "263-04",
    "263-05",
    "263-06",
    "263-07",
    "263-08",
    "263-09",
    "263-10",
    "263-11",
    "385-01",
    "385-02",
    "385-03",
    "385-04",
    "385-05",
    "385-06",
    "385-07",
    "385-08",
    "385-09",
    "385-10",
    "385-11",
    "385-12",
    "385-13",
    "385-14",
    "385-15",
    "385-16",
    "385-17",
    "385-18",
    "385-19",
    "385-20",
    "385-21",
    "385-22",
    "375-22",
    "375-24",
    "375-25",
    "375-26",
    "375-27",
    "375-28",
    "375-29",
    "375-30",
    "375-31",
    "375-32",
    "375-33",
    "375-34",
    "375-35",
    "375-36",
    "375-37",
    "375-38",
    "375-40",
    "375-39",
    "375-41",
    "375-42",
    "375-43",
    "375-44",
    "375-45",
    "375-46",
    "375-47",
    "375-48",
    "375-49",
    "375-50",
    "375-51",
    "375-52",
    "375-53",
    "375-54",
    "375-55",
    "375-56",
    "375-57",
    "375-58",
    "375-59",
    "375-60",
    "375-61",
    "375-62",
  ];
const subPhase = [
"Estudios Generales",
"Diseño",
"Administración de proyecto",
"Gestión de Ventas",
"Regalías",
"Financiamiento",
"Mercadeo y Publicidad",
"Impuesto sobre Ganancia (ISR)",
"Otros Gastos",
"Trabajos Preliminares en General",
"Permisos y Licencias",
"Seguros",
"Agrimensura y Replanteo",
"Limpieza continua y Manejo de Materiales",
"Limpieza final",
"Gerencia de Construcción",
"ITBMS",
"Pavimentos",
"Estacionamientos",
"Cercas/Muros",
"Irrigación",
"Señalización en general",
"Paisajismo en General",
"Acueducto",
"Pozos",
"Tanque de agua",
"Alcantarillado",
"Drenajes",
"Sistema Contra Incendio",
"Electricidad y Telecomunicaciones",
"Iluminación exterior",
"Fundaciones",
"Estructuras de Concreto",
"Losa de Concreto Normal",
"Losas postensadas",
"Estructura de Techo",
"Pérgolas",
"Albañilería en General",
"Plomería",
"Electricidad",
"HVAC",
"Tejas",
"Artefactos, accesorios y griferías",
"Ebanistería en General",
"Puertas de Madera",
"Puertas y ventanas de vidrio",
"Louvers",
"Vidrio Templado y Espejos",
"Cielo Raso en General",
"Revestimientos de interiores",
"Instalación de revestimiento de interiores",
"Sobres",
"Pasteo y pintura",
"Herrería",
"Iluminación",
"Elevadores",
"Electrodomésticos",
"Seguridad",
"Administración",
"Alquileres",
"Postventa y Garantias",
];

let code = [
    { name: "263-01", subFase: "Estudios Generales" },
    { name: "263-02", subFase: "Diseño" },
    { name: "263-03", subFase: "Administración de proyecto" },
    { name: "263-04", subFase: "Gestión de Ventas" },
    { name: "263-05", subFase: "Regalías" },
    { name: "263-06", subFase: "Financiamiento" },
    { name: "263-07", subFase: "Mercadeo y Publicidad" },
    { name: "263-08", subFase: "Impuesto sobre Ganancia (ISR)" },
    { name: "263-09", subFase: "Otros Gastos" },
    { name: "263-10", subFase: "Trabajos Preliminares en General" },
    { name: "263-11", subFase: "Permisos y Licencias" },
    { name: "385-01", subFase: "Trabajos Preliminares en General" },
    { name: "385-02", subFase: "Permisos y Licencias" },
    { name: "385-03", subFase: "Seguros" },
    { name: "385-04", subFase: "Agrimensura y Replanteo" },
    { name: "385-05", subFase: "Limpieza continua y Manejo de Materiales" },
    { name: "385-06", subFase: "Limpieza final" },
    { name: "385-07", subFase: "Gerencia de Construcción" },
    { name: "385-08", subFase: "ITBMS" },
    { name: "385-09", subFase: "Pavimentos" },
    { name: "385-10", subFase: "Estacionamientos" },
    { name: "385-11", subFase: "Cercas/Muros" },
    { name: "385-12", subFase: "Irrigación" },
    { name: "385-13", subFase: "Señalización en general" },
    { name: "385-14", subFase: "Paisajismo en General" },
    { name: "385-15", subFase: "Acueducto" },
    { name: "385-16", subFase: "Pozos" },
    { name: "385-17", subFase: "Tanque de agua" },
    { name: "385-18", subFase: "Alcantarillado" },
    { name: "385-19", subFase: "Drenajes" },
    { name: "385-20", subFase: "Sistema Contra Incendio" },
    { name: "385-21", subFase: "Electricidad y Telecomunicaciones" },
    { name: "385-22", subFase: "Iluminación exterior" },
    { name: "375-22", subFase: "Trabajos Preliminares en General" },
    { name: "375-24", subFase: "Permisos y Licencias" },
    { name: "375-25", subFase: "Seguros" },
    { name: "375-26", subFase: "Agrimensura y Replanteo" },
    { name: "375-27", subFase: "Fundaciones" },
    { name: "375-28", subFase: "Estructuras de Concreto" },
    { name: "375-29", subFase: "Losa de Concreto Normal" },
    { name: "375-30", subFase: "Losas postensadas" },
    { name: "375-31", subFase: "Estructura de Techo" },
    { name: "375-32", subFase: "Pérgolas" },
    { name: "375-33", subFase: "Albañilería en General" },
    { name: "375-34", subFase: "Plomería" },
    { name: "375-35", subFase: "Sistema Contra Incendio" },
    { name: "375-36", subFase: "Electricidad" },
    { name: "375-37", subFase: "HVAC" },
    { name: "375-38", subFase: "Tejas" },
    { name: "375-39", subFase: "Ebanistería en General" },
    { name: "375-40", subFase: "Artefactos, accesorios y griferías" },
    { name: "375-41", subFase: "Puertas de Madera" },
    { name: "375-42", subFase: "Puertas y ventanas de vidrio" },
    { name: "375-43", subFase: "Louvers" },
    { name: "375-44", subFase: "Vidrio Templado y Espejos" },
    { name: "375-45", subFase: "Cielo Raso en General" },
    { name: "375-46", subFase: "Revestimientos de interiores" },
    { name: "375-47", subFase: "Instalación de revestimiento de interiores" },
    { name: "375-48", subFase: "Sobres" },
    { name: "375-49", subFase: "Pasteo y pintura" },
    { name: "375-50", subFase: "Herrería" },
    { name: "375-51", subFase: "Iluminación" },
    { name: "375-52", subFase: "Elevadores" },
    { name: "375-53", subFase: "Electrodomésticos" },
    { name: "375-54", subFase: "Señalización en general" },
    { name: "375-55", subFase: "Seguridad" },
    { name: "375-56", subFase: "Administración" },
    { name: "375-57", subFase: "Alquileres" },
    { name: "375-58", subFase: "Limpieza continua y Manejo de Materiales" },
    { name: "375-59", subFase: "Limpieza Final" },
    { name: "375-60", subFase: "Gerencia de Construcción" },
    { name: "375-61", subFase: "ITBMS" },
    { name: "375-62", subFase: "Postventa y Garantias" }
  ];
  
await mongoose.connect('mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("db connected"));

let uploadCode = async ()=>{
    // const dataOption = codeOption.map(item => ({ name: formatString(item) }));
    // console.log("res",res)
    if(code.length){
        await Code.insertMany(code).then(function () {
            console.log("Data inserted Code")  // Success
        }).catch(function (error) {
            console.log('rdrError', error)      // Failure
        });
    }
}


let uploadSubPhase = async ()=>{
    const dataOption = subPhase.map(item => ({ name: formatString(item) }));

    // await mongoose.connect('mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("db connected"));
    // console.log("res",res)
    if(dataOption.length){
        await SubPhase.insertMany(dataOption).then(function () {
            console.log("Data inserted subPhase")  // Success
        }).catch(function (error) {
            console.log('rdrError', error)      // Failure
        });
    }
}


  uploadCode()
//   uploadSubPhase()