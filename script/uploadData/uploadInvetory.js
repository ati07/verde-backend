import axios from 'axios'
import xlsx from 'xlsx'
import { formatString } from '../helper.js';
import fs from 'fs';
import Inventory from '../../models/inventory.js';
import mongoose from 'mongoose';

let clients = [
    {
        "_id": "67f2b450ede5f560a5b3420a",
        "name": "tomas guerra",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:20.305Z",
        "updatedAt": "2025-04-06T17:05:20.305Z",
        "__v": 0
    },
    {
        "_id": "67f2b450ede5f560a5b34208",
        "name": "tuira torrijos",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:20.016Z",
        "updatedAt": "2025-04-06T17:05:20.016Z",
        "__v": 0
    },
    {
        "_id": "67f2b44fede5f560a5b34206",
        "name": "liron soll",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:19.731Z",
        "updatedAt": "2025-04-06T17:05:19.731Z",
        "__v": 0
    },
    {
        "_id": "67f2b44fede5f560a5b34204",
        "name": "finnian kelly",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:19.307Z",
        "updatedAt": "2025-04-06T17:05:19.307Z",
        "__v": 0
    },
    {
        "_id": "67f2b44eede5f560a5b34202",
        "name": "john thomas kounelias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:18.993Z",
        "updatedAt": "2025-04-06T17:05:18.993Z",
        "__v": 0
    },
    {
        "_id": "67f2b44eede5f560a5b34200",
        "name": "lior ben dor",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:18.707Z",
        "updatedAt": "2025-04-06T17:05:18.707Z",
        "__v": 0
    },
    {
        "_id": "67f2b44eede5f560a5b341fe",
        "name": "victoria aleman",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:18.278Z",
        "updatedAt": "2025-04-06T17:05:18.278Z",
        "__v": 0
    },
    {
        "_id": "67f2b44dede5f560a5b341fc",
        "name": "jorge cano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:17.765Z",
        "updatedAt": "2025-04-06T17:05:17.765Z",
        "__v": 0
    },
    {
        "_id": "67f2b44dede5f560a5b341fa",
        "name": "fátima lópez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:17.055Z",
        "updatedAt": "2025-04-06T17:05:17.055Z",
        "__v": 0
    },
    {
        "_id": "67f2b44cede5f560a5b341f8",
        "name": "caroline howell",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:16.639Z",
        "updatedAt": "2025-04-06T17:05:16.639Z",
        "__v": 0
    },
    {
        "_id": "67f2b44cede5f560a5b341f6",
        "name": "zebulun gadeloff",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:16.333Z",
        "updatedAt": "2025-04-06T17:05:16.333Z",
        "__v": 0
    },
    {
        "_id": "67f2b44cede5f560a5b341f4",
        "name": "sebastien van hal",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:16.028Z",
        "updatedAt": "2025-04-06T17:05:16.028Z",
        "__v": 0
    },
    {
        "_id": "67f2b44bede5f560a5b341f2",
        "name": "navia sánchez de wilson",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:15.381Z",
        "updatedAt": "2025-04-06T17:05:15.381Z",
        "__v": 0
    },
    {
        "_id": "67f2b44bede5f560a5b341f0",
        "name": "sunil hartono",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:15.008Z",
        "updatedAt": "2025-04-06T17:05:15.008Z",
        "__v": 0
    },
    {
        "_id": "67f2b44aede5f560a5b341ee",
        "name": "roberto arauz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:14.293Z",
        "updatedAt": "2025-04-06T17:05:14.293Z",
        "__v": 0
    },
    {
        "_id": "67f2b449ede5f560a5b341ec",
        "name": "eric morales",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:13.974Z",
        "updatedAt": "2025-04-06T17:05:13.974Z",
        "__v": 0
    },
    {
        "_id": "67f2b449ede5f560a5b341ea",
        "name": "salomon btesh",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:13.673Z",
        "updatedAt": "2025-04-06T17:05:13.673Z",
        "__v": 0
    },
    {
        "_id": "67f2b448ede5f560a5b341e8",
        "name": "ana mae diaz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:12.946Z",
        "updatedAt": "2025-04-06T17:05:12.946Z",
        "__v": 0
    },
    {
        "_id": "67f2b448ede5f560a5b341e6",
        "name": "juan octavio diaz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:12.592Z",
        "updatedAt": "2025-04-06T17:05:12.592Z",
        "__v": 0
    },
    {
        "_id": "67f2b447ede5f560a5b341e4",
        "name": "antonio miro",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:11.966Z",
        "updatedAt": "2025-04-06T17:05:11.966Z",
        "__v": 0
    },
    {
        "_id": "67f2b447ede5f560a5b341e2",
        "name": "gustavo garcia de paredes",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:11.669Z",
        "updatedAt": "2025-04-06T17:05:11.669Z",
        "__v": 0
    },
    {
        "_id": "67f2b447ede5f560a5b341e0",
        "name": "ricky calvo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:11.387Z",
        "updatedAt": "2025-04-06T17:05:11.387Z",
        "__v": 0
    },
    {
        "_id": "67f2b447ede5f560a5b341de",
        "name": "tatiana buree",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:11.097Z",
        "updatedAt": "2025-04-06T17:05:11.097Z",
        "__v": 0
    },
    {
        "_id": "67f2b446ede5f560a5b341dc",
        "name": "jacobo coriat",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:10.603Z",
        "updatedAt": "2025-04-06T17:05:10.603Z",
        "__v": 0
    },
    {
        "_id": "67f2b445ede5f560a5b341da",
        "name": "emerson cano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:09.674Z",
        "updatedAt": "2025-04-06T17:05:09.674Z",
        "__v": 0
    },
    {
        "_id": "67f2b444ede5f560a5b341d8",
        "name": "emmy motta",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:08.961Z",
        "updatedAt": "2025-04-06T17:05:08.961Z",
        "__v": 0
    },
    {
        "_id": "67f2b444ede5f560a5b341d6",
        "name": "karen barahona",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:08.141Z",
        "updatedAt": "2025-04-06T17:05:08.141Z",
        "__v": 0
    },
    {
        "_id": "67f2b443ede5f560a5b341d4",
        "name": "luis zou",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:07.327Z",
        "updatedAt": "2025-04-06T17:05:07.327Z",
        "__v": 0
    },
    {
        "_id": "67f2b442ede5f560a5b341d2",
        "name": "felix yet",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:06.815Z",
        "updatedAt": "2025-04-06T17:05:06.815Z",
        "__v": 0
    },
    {
        "_id": "67f2b442ede5f560a5b341d0",
        "name": "juana corral",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:06.407Z",
        "updatedAt": "2025-04-06T17:05:06.407Z",
        "__v": 0
    },
    {
        "_id": "67f2b441ede5f560a5b341ce",
        "name": "isabel flautero",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:05.785Z",
        "updatedAt": "2025-04-06T17:05:05.785Z",
        "__v": 0
    },
    {
        "_id": "67f2b441ede5f560a5b341cc",
        "name": "katherine lee jiang",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:05.479Z",
        "updatedAt": "2025-04-06T17:05:05.479Z",
        "__v": 0
    },
    {
        "_id": "67f2b441ede5f560a5b341ca",
        "name": "maria elena estrada",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:05.072Z",
        "updatedAt": "2025-04-06T17:05:05.072Z",
        "__v": 0
    },
    {
        "_id": "67f2b440ede5f560a5b341c8",
        "name": "eugenio de los santos",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:04.556Z",
        "updatedAt": "2025-04-06T17:05:04.556Z",
        "__v": 0
    },
    {
        "_id": "67f2b440ede5f560a5b341c6",
        "name": "luis miguel martin",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:04.051Z",
        "updatedAt": "2025-04-06T17:05:04.051Z",
        "__v": 0
    },
    {
        "_id": "67f2b43fede5f560a5b341c4",
        "name": "francisco zhong",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:03.737Z",
        "updatedAt": "2025-04-06T17:05:03.737Z",
        "__v": 0
    },
    {
        "_id": "67f2b43eede5f560a5b341c2",
        "name": "daniella sacco",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:02.826Z",
        "updatedAt": "2025-04-06T17:05:02.826Z",
        "__v": 0
    },
    {
        "_id": "67f2b43eede5f560a5b341c0",
        "name": "rosella bottone",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:02.509Z",
        "updatedAt": "2025-04-06T17:05:02.509Z",
        "__v": 0
    },
    {
        "_id": "67f2b43dede5f560a5b341be",
        "name": "yesid camelo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:01.689Z",
        "updatedAt": "2025-04-06T17:05:01.689Z",
        "__v": 0
    },
    {
        "_id": "67f2b43cede5f560a5b341bc",
        "name": "roxana patricia alarcón de mueller",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:05:00.670Z",
        "updatedAt": "2025-04-06T17:05:00.670Z",
        "__v": 0
    },
    {
        "_id": "67f2b43aede5f560a5b341ba",
        "name": "alejandro riera",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:58.824Z",
        "updatedAt": "2025-04-06T17:04:58.824Z",
        "__v": 0
    },
    {
        "_id": "67f2b439ede5f560a5b341b8",
        "name": "anibal de leon",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:57.901Z",
        "updatedAt": "2025-04-06T17:04:57.901Z",
        "__v": 0
    },
    {
        "_id": "67f2b439ede5f560a5b341b6",
        "name": "juan carlos pinto",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:57.490Z",
        "updatedAt": "2025-04-06T17:04:57.490Z",
        "__v": 0
    },
    {
        "_id": "67f2b439ede5f560a5b341b4",
        "name": "jorge urbano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:57.080Z",
        "updatedAt": "2025-04-06T17:04:57.080Z",
        "__v": 0
    },
    {
        "_id": "67f2b438ede5f560a5b341b2",
        "name": "arturo miranda castillo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:56.774Z",
        "updatedAt": "2025-04-06T17:04:56.774Z",
        "__v": 0
    },
    {
        "_id": "67f2b438ede5f560a5b341b0",
        "name": "norberto herdez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:56.428Z",
        "updatedAt": "2025-04-06T17:04:56.428Z",
        "__v": 0
    },
    {
        "_id": "67f2b436ede5f560a5b341ae",
        "name": "ana lorena ortega",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:54.417Z",
        "updatedAt": "2025-04-06T17:04:54.417Z",
        "__v": 0
    },
    {
        "_id": "67f2b434ede5f560a5b341ac",
        "name": "juan gabriel gonzález",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:52.580Z",
        "updatedAt": "2025-04-06T17:04:52.580Z",
        "__v": 0
    },
    {
        "_id": "67f2b434ede5f560a5b341aa",
        "name": "gerry racicot",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:52.180Z",
        "updatedAt": "2025-04-06T17:04:52.180Z",
        "__v": 0
    },
    {
        "_id": "67f2b433ede5f560a5b341a8",
        "name": "alfonso arias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:51.757Z",
        "updatedAt": "2025-04-06T17:04:51.757Z",
        "__v": 0
    },
    {
        "_id": "67f2b433ede5f560a5b341a6",
        "name": "francisco perez salamero",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:51.354Z",
        "updatedAt": "2025-04-06T17:04:51.354Z",
        "__v": 0
    },
    {
        "_id": "67f2b432ede5f560a5b341a4",
        "name": "josé boyd",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:50.330Z",
        "updatedAt": "2025-04-06T17:04:50.330Z",
        "__v": 0
    },
    {
        "_id": "67f2b431ede5f560a5b341a2",
        "name": "estefania zevallos",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:49.919Z",
        "updatedAt": "2025-04-06T17:04:49.919Z",
        "__v": 0
    },
    {
        "_id": "67f2b431ede5f560a5b341a0",
        "name": "carlos herrera",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:49.171Z",
        "updatedAt": "2025-04-06T17:04:49.171Z",
        "__v": 0
    },
    {
        "_id": "67f2b42fede5f560a5b3419e",
        "name": "maría eugenia suárez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:47.359Z",
        "updatedAt": "2025-04-06T17:04:47.359Z",
        "__v": 0
    },
    {
        "_id": "67f2b42eede5f560a5b3419c",
        "name": "robert quartermaid",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:46.946Z",
        "updatedAt": "2025-04-06T17:04:46.946Z",
        "__v": 0
    },
    {
        "_id": "67f2b42dede5f560a5b3419a",
        "name": "michail ioffe",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:45.897Z",
        "updatedAt": "2025-04-06T17:04:45.897Z",
        "__v": 0
    },
    {
        "_id": "67f2b42dede5f560a5b34198",
        "name": "philippe deltomme",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:45.308Z",
        "updatedAt": "2025-04-06T17:04:45.308Z",
        "__v": 0
    },
    {
        "_id": "67f2b42bede5f560a5b34196",
        "name": "diana de la guardia",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:43.275Z",
        "updatedAt": "2025-04-06T17:04:43.275Z",
        "__v": 0
    },
    {
        "_id": "67f2b42aede5f560a5b34194",
        "name": "johnny morales",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:42.425Z",
        "updatedAt": "2025-04-06T17:04:42.425Z",
        "__v": 0
    },
    {
        "_id": "67f2b429ede5f560a5b34192",
        "name": "luis alejandro palacios",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:41.521Z",
        "updatedAt": "2025-04-06T17:04:41.521Z",
        "__v": 0
    },
    {
        "_id": "67f2b429ede5f560a5b34190",
        "name": "teresita garcía de paredes",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:41.119Z",
        "updatedAt": "2025-04-06T17:04:41.119Z",
        "__v": 0
    },
    {
        "_id": "67f2b428ede5f560a5b3418e",
        "name": "bohdan kopytko",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:40.332Z",
        "updatedAt": "2025-04-06T17:04:40.332Z",
        "__v": 0
    },
    {
        "_id": "67f2b426ede5f560a5b3418c",
        "name": "edwin cudyk",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:38.098Z",
        "updatedAt": "2025-04-06T17:04:38.098Z",
        "__v": 0
    },
    {
        "_id": "67f2b424ede5f560a5b3418a",
        "name": "maría alejandra campo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:36.502Z",
        "updatedAt": "2025-04-06T17:04:36.502Z",
        "__v": 0
    },
    {
        "_id": "67f2b423ede5f560a5b34188",
        "name": "carlos duboy",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:35.684Z",
        "updatedAt": "2025-04-06T17:04:35.684Z",
        "__v": 0
    },
    {
        "_id": "67f2b422ede5f560a5b34186",
        "name": "isaac schwartz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:34.847Z",
        "updatedAt": "2025-04-06T17:04:34.847Z",
        "__v": 0
    },
    {
        "_id": "67f2b421ede5f560a5b34184",
        "name": "richard toledano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:33.962Z",
        "updatedAt": "2025-04-06T17:04:33.962Z",
        "__v": 0
    },
    {
        "_id": "67f2b41eede5f560a5b34182",
        "name": "ivan jurado",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:30.614Z",
        "updatedAt": "2025-04-06T17:04:30.614Z",
        "__v": 0
    },
    {
        "_id": "67f2b41dede5f560a5b34180",
        "name": "maría altagracia álvarez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:29.537Z",
        "updatedAt": "2025-04-06T17:04:29.537Z",
        "__v": 0
    },
    {
        "_id": "67f2b41cede5f560a5b3417e",
        "name": "ferdo perez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:28.294Z",
        "updatedAt": "2025-04-06T17:04:28.294Z",
        "__v": 0
    },
    {
        "_id": "67f2b41bede5f560a5b3417c",
        "name": "barbara brustein",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:27.947Z",
        "updatedAt": "2025-04-06T17:04:27.947Z",
        "__v": 0
    },
    {
        "_id": "67f2b41bede5f560a5b3417a",
        "name": "tacho ruiz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:27.140Z",
        "updatedAt": "2025-04-06T17:04:27.140Z",
        "__v": 0
    },
    {
        "_id": "67f2b41aede5f560a5b34178",
        "name": "jeremy reynolds",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:26.762Z",
        "updatedAt": "2025-04-06T17:04:26.762Z",
        "__v": 0
    },
    {
        "_id": "67f2b41aede5f560a5b34176",
        "name": "kent keith",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:26.397Z",
        "updatedAt": "2025-04-06T17:04:26.397Z",
        "__v": 0
    },
    {
        "_id": "67f2b41aede5f560a5b34174",
        "name": "margarita arias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:26.092Z",
        "updatedAt": "2025-04-06T17:04:26.092Z",
        "__v": 0
    },
    {
        "_id": "67f2b418ede5f560a5b34172",
        "name": "melinda arias de morrice",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:24.999Z",
        "updatedAt": "2025-04-06T17:04:24.999Z",
        "__v": 0
    },
    {
        "_id": "67f2b418ede5f560a5b34170",
        "name": "ines medina",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:24.626Z",
        "updatedAt": "2025-04-06T17:04:24.626Z",
        "__v": 0
    },
    {
        "_id": "67f2b418ede5f560a5b3416e",
        "name": "yamileth cedeño",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:24.228Z",
        "updatedAt": "2025-04-06T17:04:24.228Z",
        "__v": 0
    },
    {
        "_id": "67f2b417ede5f560a5b3416c",
        "name": "auristela orozco",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:23.937Z",
        "updatedAt": "2025-04-06T17:04:23.937Z",
        "__v": 0
    },
    {
        "_id": "67f2b417ede5f560a5b3416a",
        "name": "jaime correa",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:23.653Z",
        "updatedAt": "2025-04-06T17:04:23.653Z",
        "__v": 0
    },
    {
        "_id": "67f2b417ede5f560a5b34168",
        "name": "jorge velez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:23.170Z",
        "updatedAt": "2025-04-06T17:04:23.170Z",
        "__v": 0
    },
    {
        "_id": "67f2b416ede5f560a5b34166",
        "name": "jörg medrow",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:22.721Z",
        "updatedAt": "2025-04-06T17:04:22.721Z",
        "__v": 0
    },
    {
        "_id": "67f2b416ede5f560a5b34164",
        "name": "josé molina",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:22.198Z",
        "updatedAt": "2025-04-06T17:04:22.198Z",
        "__v": 0
    },
    {
        "_id": "67f2b414ede5f560a5b34162",
        "name": "rita liao pan",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:20.909Z",
        "updatedAt": "2025-04-06T17:04:20.909Z",
        "__v": 0
    },
    {
        "_id": "67f2b414ede5f560a5b34160",
        "name": "xiomara davis gumbs",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:20.323Z",
        "updatedAt": "2025-04-06T17:04:20.323Z",
        "__v": 0
    },
    {
        "_id": "67f2b413ede5f560a5b3415e",
        "name": "carmenza pelaez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:19.938Z",
        "updatedAt": "2025-04-06T17:04:19.938Z",
        "__v": 0
    },
    {
        "_id": "67f2b413ede5f560a5b3415c",
        "name": "katherine ann gadd",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:19.512Z",
        "updatedAt": "2025-04-06T17:04:19.512Z",
        "__v": 0
    },
    {
        "_id": "67f2b412ede5f560a5b3415a",
        "name": "adrian ratner",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:18.510Z",
        "updatedAt": "2025-04-06T17:04:18.510Z",
        "__v": 0
    },
    {
        "_id": "67f2b410ede5f560a5b34158",
        "name": "silvia smith",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:16.643Z",
        "updatedAt": "2025-04-06T17:04:16.643Z",
        "__v": 0
    },
    {
        "_id": "67f2b410ede5f560a5b34156",
        "name": "felix fallabella",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:16.117Z",
        "updatedAt": "2025-04-06T17:04:16.117Z",
        "__v": 0
    },
    {
        "_id": "67f2b40fede5f560a5b34154",
        "name": "roberto carretero",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:15.265Z",
        "updatedAt": "2025-04-06T17:04:15.265Z",
        "__v": 0
    },
    {
        "_id": "67f2b40eede5f560a5b34152",
        "name": "maría de pinto",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:14.934Z",
        "updatedAt": "2025-04-06T17:04:14.934Z",
        "__v": 0
    },
    {
        "_id": "67f2b40eede5f560a5b34150",
        "name": "analida hageman",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:14.624Z",
        "updatedAt": "2025-04-06T17:04:14.624Z",
        "__v": 0
    },
    {
        "_id": "67f2b40eede5f560a5b3414e",
        "name": "sharon phillips",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:14.337Z",
        "updatedAt": "2025-04-06T17:04:14.337Z",
        "__v": 0
    },
    {
        "_id": "67f2b40dede5f560a5b3414c",
        "name": "alejandro fernández",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:13.210Z",
        "updatedAt": "2025-04-06T17:04:13.210Z",
        "__v": 0
    },
    {
        "_id": "67f2b40cede5f560a5b3414a",
        "name": "lodge, inc. morris",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:12.839Z",
        "updatedAt": "2025-04-06T17:04:12.839Z",
        "__v": 0
    },
    {
        "_id": "67f2b40cede5f560a5b34148",
        "name": "vicente liao",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:12.552Z",
        "updatedAt": "2025-04-06T17:04:12.552Z",
        "__v": 0
    },
    {
        "_id": "67f2b40cede5f560a5b34146",
        "name": "jorge luis lara tejada",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:12.189Z",
        "updatedAt": "2025-04-06T17:04:12.189Z",
        "__v": 0
    },
    {
        "_id": "67f2b40bede5f560a5b34144",
        "name": "nelva alvarez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:11.839Z",
        "updatedAt": "2025-04-06T17:04:11.839Z",
        "__v": 0
    },
    {
        "_id": "67f2b40bede5f560a5b34142",
        "name": "adolfo olloqui",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:11.416Z",
        "updatedAt": "2025-04-06T17:04:11.416Z",
        "__v": 0
    },
    {
        "_id": "67f2b40bede5f560a5b34140",
        "name": "alicia bañuelos",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:11.054Z",
        "updatedAt": "2025-04-06T17:04:11.054Z",
        "__v": 0
    },
    {
        "_id": "67f2b40aede5f560a5b3413e",
        "name": "samarkanda lay",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:10.768Z",
        "updatedAt": "2025-04-06T17:04:10.768Z",
        "__v": 0
    },
    {
        "_id": "67f2b40aede5f560a5b3413c",
        "name": "rafael prieto",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:10.467Z",
        "updatedAt": "2025-04-06T17:04:10.467Z",
        "__v": 0
    },
    {
        "_id": "67f2b40aede5f560a5b3413a",
        "name": "augusto herdez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:10.182Z",
        "updatedAt": "2025-04-06T17:04:10.182Z",
        "__v": 0
    },
    {
        "_id": "67f2b409ede5f560a5b34138",
        "name": "farah molino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:09.855Z",
        "updatedAt": "2025-04-06T17:04:09.855Z",
        "__v": 0
    },
    {
        "_id": "67f2b408ede5f560a5b34136",
        "name": "inyira canalias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:08.291Z",
        "updatedAt": "2025-04-06T17:04:08.291Z",
        "__v": 0
    },
    {
        "_id": "67f2b407ede5f560a5b34134",
        "name": "vanessa moreno",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:07.996Z",
        "updatedAt": "2025-04-06T17:04:07.996Z",
        "__v": 0
    },
    {
        "_id": "67f2b407ede5f560a5b34132",
        "name": "armando quintero",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:07.480Z",
        "updatedAt": "2025-04-06T17:04:07.480Z",
        "__v": 0
    },
    {
        "_id": "67f2b406ede5f560a5b34130",
        "name": "joaquin jimenez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:06.604Z",
        "updatedAt": "2025-04-06T17:04:06.604Z",
        "__v": 0
    },
    {
        "_id": "67f2b406ede5f560a5b3412e",
        "name": "jacob burnopp",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:06.041Z",
        "updatedAt": "2025-04-06T17:04:06.041Z",
        "__v": 0
    },
    {
        "_id": "67f2b405ede5f560a5b3412c",
        "name": "joel rodríguez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:05.348Z",
        "updatedAt": "2025-04-06T17:04:05.348Z",
        "__v": 0
    },
    {
        "_id": "67f2b404ede5f560a5b3412a",
        "name": "jenny chen",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:04.429Z",
        "updatedAt": "2025-04-06T17:04:04.429Z",
        "__v": 0
    },
    {
        "_id": "67f2b403ede5f560a5b34128",
        "name": "mabel moreno",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:03.434Z",
        "updatedAt": "2025-04-06T17:04:03.434Z",
        "__v": 0
    },
    {
        "_id": "67f2b403ede5f560a5b34126",
        "name": "lyle huntoon",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:03.144Z",
        "updatedAt": "2025-04-06T17:04:03.144Z",
        "__v": 0
    },
    {
        "_id": "67f2b402ede5f560a5b34124",
        "name": "regulo lopez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:02.845Z",
        "updatedAt": "2025-04-06T17:04:02.845Z",
        "__v": 0
    },
    {
        "_id": "67f2b402ede5f560a5b34122",
        "name": "rogelio rendon",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:02.550Z",
        "updatedAt": "2025-04-06T17:04:02.550Z",
        "__v": 0
    },
    {
        "_id": "67f2b402ede5f560a5b34120",
        "name": "ricardo alfaro",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:02.194Z",
        "updatedAt": "2025-04-06T17:04:02.194Z",
        "__v": 0
    },
    {
        "_id": "67f2b401ede5f560a5b3411e",
        "name": "wayne boehme",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:01.905Z",
        "updatedAt": "2025-04-06T17:04:01.905Z",
        "__v": 0
    },
    {
        "_id": "67f2b401ede5f560a5b3411c",
        "name": "omar rodriguez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:01.625Z",
        "updatedAt": "2025-04-06T17:04:01.625Z",
        "__v": 0
    },
    {
        "_id": "67f2b401ede5f560a5b3411a",
        "name": "lorenzo del buey",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:01.336Z",
        "updatedAt": "2025-04-06T17:04:01.336Z",
        "__v": 0
    },
    {
        "_id": "67f2b400ede5f560a5b34118",
        "name": "sugeiry rodriguez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:00.886Z",
        "updatedAt": "2025-04-06T17:04:00.886Z",
        "__v": 0
    },
    {
        "_id": "67f2b400ede5f560a5b34116",
        "name": "rosa milagro de ferdez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:00.603Z",
        "updatedAt": "2025-04-06T17:04:00.603Z",
        "__v": 0
    },
    {
        "_id": "67f2b400ede5f560a5b34114",
        "name": "alfonso wong giannareas",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:00.319Z",
        "updatedAt": "2025-04-06T17:04:00.319Z",
        "__v": 0
    },
    {
        "_id": "67f2b400ede5f560a5b34112",
        "name": "maria josé sucre",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:04:00.031Z",
        "updatedAt": "2025-04-06T17:04:00.031Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ffede5f560a5b34110",
        "name": "maria alvarado",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:59.419Z",
        "updatedAt": "2025-04-06T17:03:59.419Z",
        "__v": 0
    },
    {
        "_id": "67f2b3feede5f560a5b3410e",
        "name": "plinio rodríguez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:58.871Z",
        "updatedAt": "2025-04-06T17:03:58.871Z",
        "__v": 0
    },
    {
        "_id": "67f2b3feede5f560a5b3410c",
        "name": "rogelio moreno sima",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:58.236Z",
        "updatedAt": "2025-04-06T17:03:58.236Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fdede5f560a5b3410a",
        "name": "ana maria orjuela",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:57.926Z",
        "updatedAt": "2025-04-06T17:03:57.926Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fdede5f560a5b34108",
        "name": "martin vanselow",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:57.613Z",
        "updatedAt": "2025-04-06T17:03:57.613Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fcede5f560a5b34106",
        "name": "marc kublun",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:56.773Z",
        "updatedAt": "2025-04-06T17:03:56.773Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fcede5f560a5b34104",
        "name": "daniel enrique vivas barrios",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:56.462Z",
        "updatedAt": "2025-04-06T17:03:56.462Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fcede5f560a5b34102",
        "name": "manuel grillo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:56.128Z",
        "updatedAt": "2025-04-06T17:03:56.128Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fbede5f560a5b34100",
        "name": "lorenzo verlicchi",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:55.837Z",
        "updatedAt": "2025-04-06T17:03:55.837Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fbede5f560a5b340fe",
        "name": "hector soucy",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:55.450Z",
        "updatedAt": "2025-04-06T17:03:55.450Z",
        "__v": 0
    },
    {
        "_id": "67f2b3fbede5f560a5b340fc",
        "name": "brandon william",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:55.152Z",
        "updatedAt": "2025-04-06T17:03:55.152Z",
        "__v": 0
    },
    {
        "_id": "67f2b3faede5f560a5b340fa",
        "name": "luis ferdo chacon",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:54.736Z",
        "updatedAt": "2025-04-06T17:03:54.736Z",
        "__v": 0
    },
    {
        "_id": "67f2b3faede5f560a5b340f8",
        "name": "martha chen de magdalena",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:54.446Z",
        "updatedAt": "2025-04-06T17:03:54.446Z",
        "__v": 0
    },
    {
        "_id": "67f2b3faede5f560a5b340f6",
        "name": "roberto ricardo lara",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:54.123Z",
        "updatedAt": "2025-04-06T17:03:54.123Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f9ede5f560a5b340f4",
        "name": "pedro alvarado",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:53.703Z",
        "updatedAt": "2025-04-06T17:03:53.703Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f9ede5f560a5b340f2",
        "name": "leonardo gonzález",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:53.415Z",
        "updatedAt": "2025-04-06T17:03:53.415Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f9ede5f560a5b340f0",
        "name": "miguel angel carballeda",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:53.003Z",
        "updatedAt": "2025-04-06T17:03:53.003Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f8ede5f560a5b340ee",
        "name": "maria ferda diaz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:52.012Z",
        "updatedAt": "2025-04-06T17:03:52.012Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f7ede5f560a5b340ec",
        "name": "angie beer",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:51.487Z",
        "updatedAt": "2025-04-06T17:03:51.487Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f7ede5f560a5b340ea",
        "name": "pedro cordovez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:51.184Z",
        "updatedAt": "2025-04-06T17:03:51.184Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f6ede5f560a5b340e8",
        "name": "rogelio romero",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:50.886Z",
        "updatedAt": "2025-04-06T17:03:50.886Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f6ede5f560a5b340e6",
        "name": "miguel triana",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:50.529Z",
        "updatedAt": "2025-04-06T17:03:50.529Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f6ede5f560a5b340e4",
        "name": "landy guillen",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:50.248Z",
        "updatedAt": "2025-04-06T17:03:50.248Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f5ede5f560a5b340e2",
        "name": "ana lucia herrera",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:49.961Z",
        "updatedAt": "2025-04-06T17:03:49.961Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f5ede5f560a5b340e0",
        "name": "javier e irene arias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:49.575Z",
        "updatedAt": "2025-04-06T17:03:49.575Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f4ede5f560a5b340de",
        "name": "ramon canalias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:48.707Z",
        "updatedAt": "2025-04-06T17:03:48.707Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f4ede5f560a5b340dc",
        "name": "euclides effio perez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:48.370Z",
        "updatedAt": "2025-04-06T17:03:48.370Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f3ede5f560a5b340da",
        "name": "marisela gioconda ruiz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:47.806Z",
        "updatedAt": "2025-04-06T17:03:47.806Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f1ede5f560a5b340d8",
        "name": "antonio cheong",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:45.690Z",
        "updatedAt": "2025-04-06T17:03:45.690Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f1ede5f560a5b340d6",
        "name": "jihann pedersen",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:45.290Z",
        "updatedAt": "2025-04-06T17:03:45.290Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f0ede5f560a5b340d4",
        "name": "danna rocchio -",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:44.744Z",
        "updatedAt": "2025-04-06T17:03:44.744Z",
        "__v": 0
    },
    {
        "_id": "67f2b3f0ede5f560a5b340d2",
        "name": "icela tejeira",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:44.352Z",
        "updatedAt": "2025-04-06T17:03:44.352Z",
        "__v": 0
    },
    {
        "_id": "67f2b3efede5f560a5b340d0",
        "name": "denis vargas",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:43.936Z",
        "updatedAt": "2025-04-06T17:03:43.936Z",
        "__v": 0
    },
    {
        "_id": "67f2b3efede5f560a5b340ce",
        "name": "luis nuñez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:43.643Z",
        "updatedAt": "2025-04-06T17:03:43.643Z",
        "__v": 0
    },
    {
        "_id": "67f2b3efede5f560a5b340cc",
        "name": "ana cruz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:43.019Z",
        "updatedAt": "2025-04-06T17:03:43.019Z",
        "__v": 0
    },
    {
        "_id": "67f2b3eeede5f560a5b340ca",
        "name": "victor cubias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:42.671Z",
        "updatedAt": "2025-04-06T17:03:42.671Z",
        "__v": 0
    },
    {
        "_id": "67f2b3eeede5f560a5b340c8",
        "name": "ricky salteiro",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:42.326Z",
        "updatedAt": "2025-04-06T17:03:42.326Z",
        "__v": 0
    },
    {
        "_id": "67f2b3edede5f560a5b340c6",
        "name": "rajesh badlani",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:41.988Z",
        "updatedAt": "2025-04-06T17:03:41.988Z",
        "__v": 0
    },
    {
        "_id": "67f2b3edede5f560a5b340c4",
        "name": "julio spiegel",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:41.265Z",
        "updatedAt": "2025-04-06T17:03:41.265Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ecede5f560a5b340c2",
        "name": "maria cristina fabrega saez de duque",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:40.902Z",
        "updatedAt": "2025-04-06T17:03:40.902Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ecede5f560a5b340c0",
        "name": "helios navarro",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:40.342Z",
        "updatedAt": "2025-04-06T17:03:40.342Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ebede5f560a5b340be",
        "name": "luciana salazar",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:39.781Z",
        "updatedAt": "2025-04-06T17:03:39.781Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ebede5f560a5b340bc",
        "name": "luis eduardo arias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:39.472Z",
        "updatedAt": "2025-04-06T17:03:39.472Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ebede5f560a5b340ba",
        "name": "norman velasquez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:39.080Z",
        "updatedAt": "2025-04-06T17:03:39.080Z",
        "__v": 0
    },
    {
        "_id": "67f2b3eaede5f560a5b340b8",
        "name": "jose severino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:38.791Z",
        "updatedAt": "2025-04-06T17:03:38.791Z",
        "__v": 0
    },
    {
        "_id": "67f2b3eaede5f560a5b340b6",
        "name": "luis bandera",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:38.501Z",
        "updatedAt": "2025-04-06T17:03:38.501Z",
        "__v": 0
    },
    {
        "_id": "67f2b3eaede5f560a5b340b4",
        "name": "ana archuleta",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:38.203Z",
        "updatedAt": "2025-04-06T17:03:38.203Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e9ede5f560a5b340b2",
        "name": "ana tribaldos",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:37.792Z",
        "updatedAt": "2025-04-06T17:03:37.792Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e9ede5f560a5b340b0",
        "name": "julio césar bonilla",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:37.315Z",
        "updatedAt": "2025-04-06T17:03:37.315Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e9ede5f560a5b340ae",
        "name": "miguel cedeño",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:37.022Z",
        "updatedAt": "2025-04-06T17:03:37.022Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e8ede5f560a5b340ac",
        "name": "moises chanis",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:36.254Z",
        "updatedAt": "2025-04-06T17:03:36.254Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e7ede5f560a5b340aa",
        "name": "alejandra lewis",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:35.877Z",
        "updatedAt": "2025-04-06T17:03:35.877Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e7ede5f560a5b340a8",
        "name": "juan david hoffman",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:35.547Z",
        "updatedAt": "2025-04-06T17:03:35.547Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e6ede5f560a5b340a6",
        "name": "irma altamirano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:34.999Z",
        "updatedAt": "2025-04-06T17:03:34.999Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e6ede5f560a5b340a4",
        "name": "gabriel barletta",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:34.616Z",
        "updatedAt": "2025-04-06T17:03:34.616Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e6ede5f560a5b340a2",
        "name": "winston gonzalez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:34.138Z",
        "updatedAt": "2025-04-06T17:03:34.138Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e5ede5f560a5b340a0",
        "name": "mike sedgwick",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:33.796Z",
        "updatedAt": "2025-04-06T17:03:33.796Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e5ede5f560a5b3409e",
        "name": "maricel de mulino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:33.309Z",
        "updatedAt": "2025-04-06T17:03:33.309Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e5ede5f560a5b3409c",
        "name": "nicolás gaudiano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:33.017Z",
        "updatedAt": "2025-04-06T17:03:33.017Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e4ede5f560a5b3409a",
        "name": "marcela santamaría",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:32.469Z",
        "updatedAt": "2025-04-06T17:03:32.469Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e4ede5f560a5b34098",
        "name": "eduardo espinosa",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:32.188Z",
        "updatedAt": "2025-04-06T17:03:32.188Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e3ede5f560a5b34096",
        "name": "maría teresa castillo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:31.813Z",
        "updatedAt": "2025-04-06T17:03:31.813Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e2ede5f560a5b34094",
        "name": "miguel lezcano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:30.956Z",
        "updatedAt": "2025-04-06T17:03:30.956Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e2ede5f560a5b34092",
        "name": "miguel fernández",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:30.632Z",
        "updatedAt": "2025-04-06T17:03:30.632Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e2ede5f560a5b34090",
        "name": "antonio esteban mock luque",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:30.330Z",
        "updatedAt": "2025-04-06T17:03:30.330Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e1ede5f560a5b3408e",
        "name": "andrés gonzález solanilla",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:29.926Z",
        "updatedAt": "2025-04-06T17:03:29.926Z",
        "__v": 0
    },
    {
        "_id": "67f2b3e1ede5f560a5b3408c",
        "name": "mario tamayo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:29.392Z",
        "updatedAt": "2025-04-06T17:03:29.392Z",
        "__v": 0
    },
    {
        "_id": "67f2b3dfede5f560a5b3408a",
        "name": "monique mulino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:27.946Z",
        "updatedAt": "2025-04-06T17:03:27.946Z",
        "__v": 0
    },
    {
        "_id": "67f2b3dfede5f560a5b34088",
        "name": "mateo fabrega",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:27.323Z",
        "updatedAt": "2025-04-06T17:03:27.323Z",
        "__v": 0
    },
    {
        "_id": "67f2b3deede5f560a5b34086",
        "name": "alexandra mulino de vallarino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:26.789Z",
        "updatedAt": "2025-04-06T17:03:26.789Z",
        "__v": 0
    },
    {
        "_id": "67f2b3deede5f560a5b34084",
        "name": "graciela ojeda",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:26.066Z",
        "updatedAt": "2025-04-06T17:03:26.066Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ddede5f560a5b34082",
        "name": "pavel shkitin",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:25.464Z",
        "updatedAt": "2025-04-06T17:03:25.464Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ddede5f560a5b34080",
        "name": "gloria esther martinelli de virzi",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:25.031Z",
        "updatedAt": "2025-04-06T17:03:25.031Z",
        "__v": 0
    },
    {
        "_id": "67f2b3dcede5f560a5b3407e",
        "name": "alejandro watson",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:24.394Z",
        "updatedAt": "2025-04-06T17:03:24.394Z",
        "__v": 0
    },
    {
        "_id": "67f2b3dcede5f560a5b3407c",
        "name": "arturo cochez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:24.102Z",
        "updatedAt": "2025-04-06T17:03:24.102Z",
        "__v": 0
    },
    {
        "_id": "67f2b3dbede5f560a5b3407a",
        "name": "ana lucrecia de zarak",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:23.269Z",
        "updatedAt": "2025-04-06T17:03:23.269Z",
        "__v": 0
    },
    {
        "_id": "67f2b3daede5f560a5b34078",
        "name": "xiomara stanziola",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:22.112Z",
        "updatedAt": "2025-04-06T17:03:22.112Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d9ede5f560a5b34076",
        "name": "pascual bonilla",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:21.682Z",
        "updatedAt": "2025-04-06T17:03:21.682Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d9ede5f560a5b34074",
        "name": "jessica medina",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:21.215Z",
        "updatedAt": "2025-04-06T17:03:21.215Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d8ede5f560a5b34072",
        "name": "andres flores",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:20.916Z",
        "updatedAt": "2025-04-06T17:03:20.916Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d8ede5f560a5b34070",
        "name": "raúl spiegel",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:20.617Z",
        "updatedAt": "2025-04-06T17:03:20.617Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d8ede5f560a5b3406e",
        "name": "osiris perez de gutierrez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:20.329Z",
        "updatedAt": "2025-04-06T17:03:20.329Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d8ede5f560a5b3406c",
        "name": "demetrio arosemena",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:20.032Z",
        "updatedAt": "2025-04-06T17:03:20.032Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d7ede5f560a5b3406a",
        "name": "josé orillac",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:19.709Z",
        "updatedAt": "2025-04-06T17:03:19.709Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d7ede5f560a5b34068",
        "name": "benny naimark",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:19.428Z",
        "updatedAt": "2025-04-06T17:03:19.428Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d7ede5f560a5b34066",
        "name": "alonso díaz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:19.138Z",
        "updatedAt": "2025-04-06T17:03:19.138Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d6ede5f560a5b34064",
        "name": "itza lewis",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:18.216Z",
        "updatedAt": "2025-04-06T17:03:18.216Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d5ede5f560a5b34062",
        "name": "félix ruíz",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:17.888Z",
        "updatedAt": "2025-04-06T17:03:17.888Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d5ede5f560a5b34060",
        "name": "joseph benaim",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:17.591Z",
        "updatedAt": "2025-04-06T17:03:17.591Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d5ede5f560a5b3405e",
        "name": "adrián arias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:17.291Z",
        "updatedAt": "2025-04-06T17:03:17.291Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d4ede5f560a5b3405c",
        "name": "gian marco cordoba",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:16.986Z",
        "updatedAt": "2025-04-06T17:03:16.986Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d4ede5f560a5b3405a",
        "name": "raphael wanjelik",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:16.708Z",
        "updatedAt": "2025-04-06T17:03:16.708Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d4ede5f560a5b34058",
        "name": "karen buitrago moreno",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:16.406Z",
        "updatedAt": "2025-04-06T17:03:16.406Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d4ede5f560a5b34056",
        "name": "juan carlos yi",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:16.128Z",
        "updatedAt": "2025-04-06T17:03:16.128Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d3ede5f560a5b34054",
        "name": "brandon sheehan",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:15.836Z",
        "updatedAt": "2025-04-06T17:03:15.836Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d3ede5f560a5b34052",
        "name": "efren cedeño",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:15.386Z",
        "updatedAt": "2025-04-06T17:03:15.386Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d3ede5f560a5b34050",
        "name": "giancarlo del cioppo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:15.092Z",
        "updatedAt": "2025-04-06T17:03:15.092Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d2ede5f560a5b3404e",
        "name": "mariuber torres",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:14.792Z",
        "updatedAt": "2025-04-06T17:03:14.792Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d2ede5f560a5b3404c",
        "name": "juan pablo duran",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:14.492Z",
        "updatedAt": "2025-04-06T17:03:14.492Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d2ede5f560a5b3404a",
        "name": "rosa maría de cassino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:14.200Z",
        "updatedAt": "2025-04-06T17:03:14.200Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d1ede5f560a5b34048",
        "name": "pablo malacara",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:13.854Z",
        "updatedAt": "2025-04-06T17:03:13.854Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d1ede5f560a5b34046",
        "name": "jorge antonio serrano elias",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:13.071Z",
        "updatedAt": "2025-04-06T17:03:13.071Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d0ede5f560a5b34044",
        "name": "danny pinska",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:12.569Z",
        "updatedAt": "2025-04-06T17:03:12.569Z",
        "__v": 0
    },
    {
        "_id": "67f2b3d0ede5f560a5b34042",
        "name": "harry marin",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:12.283Z",
        "updatedAt": "2025-04-06T17:03:12.283Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cfede5f560a5b34040",
        "name": "roberto luna",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:11.964Z",
        "updatedAt": "2025-04-06T17:03:11.964Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cfede5f560a5b3403e",
        "name": "manuel aizpurua",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:11.335Z",
        "updatedAt": "2025-04-06T17:03:11.335Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ceede5f560a5b3403c",
        "name": "carlos gonzalez zapateiro",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:10.451Z",
        "updatedAt": "2025-04-06T17:03:10.451Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ceede5f560a5b3403a",
        "name": "raul civiello",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:10.146Z",
        "updatedAt": "2025-04-06T17:03:10.146Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cdede5f560a5b34038",
        "name": "carlos allen",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:09.631Z",
        "updatedAt": "2025-04-06T17:03:09.631Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cdede5f560a5b34036",
        "name": "jorge ng",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:09.346Z",
        "updatedAt": "2025-04-06T17:03:09.346Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cdede5f560a5b34034",
        "name": "alexandra ortega",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:09.046Z",
        "updatedAt": "2025-04-06T17:03:09.046Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ccede5f560a5b34032",
        "name": "césar fong",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:08.584Z",
        "updatedAt": "2025-04-06T17:03:08.584Z",
        "__v": 0
    },
    {
        "_id": "67f2b3ccede5f560a5b34030",
        "name": "francisco marengo",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:08.295Z",
        "updatedAt": "2025-04-06T17:03:08.295Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cbede5f560a5b3402e",
        "name": "miguel adan",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:07.754Z",
        "updatedAt": "2025-04-06T17:03:07.754Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cbede5f560a5b3402c",
        "name": "augusto tejeira",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:07.447Z",
        "updatedAt": "2025-04-06T17:03:07.447Z",
        "__v": 0
    },
    {
        "_id": "67f2b3cbede5f560a5b3402a",
        "name": "eduardo tejeira",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:07.164Z",
        "updatedAt": "2025-04-06T17:03:07.164Z",
        "__v": 0
    },
    {
        "_id": "67f2b3caede5f560a5b34028",
        "name": "anthony salerno",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:06.872Z",
        "updatedAt": "2025-04-06T17:03:06.872Z",
        "__v": 0
    },
    {
        "_id": "67f2b3caede5f560a5b34026",
        "name": "ferdo robleto",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:06.581Z",
        "updatedAt": "2025-04-06T17:03:06.581Z",
        "__v": 0
    },
    {
        "_id": "67f2b3caede5f560a5b34024",
        "name": "gina vallarino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:06.250Z",
        "updatedAt": "2025-04-06T17:03:06.250Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c9ede5f560a5b34022",
        "name": "erika candanedo de lópez",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:05.885Z",
        "updatedAt": "2025-04-06T17:03:05.885Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c9ede5f560a5b34020",
        "name": "sandra chaves",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:05.591Z",
        "updatedAt": "2025-04-06T17:03:05.591Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c9ede5f560a5b3401e",
        "name": "gustavo pinilla",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:05.285Z",
        "updatedAt": "2025-04-06T17:03:05.285Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c8ede5f560a5b3401c",
        "name": "armando pulgar",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:04.989Z",
        "updatedAt": "2025-04-06T17:03:04.989Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c8ede5f560a5b3401a",
        "name": "carlos ehrman",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:04.688Z",
        "updatedAt": "2025-04-06T17:03:04.688Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c8ede5f560a5b34018",
        "name": "maria raquel vallarino",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:04.399Z",
        "updatedAt": "2025-04-06T17:03:04.399Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c7ede5f560a5b34016",
        "name": "rosa la spisa",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:03.637Z",
        "updatedAt": "2025-04-06T17:03:03.637Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c7ede5f560a5b34014",
        "name": "jose gabriel almanza rojas",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:03.001Z",
        "updatedAt": "2025-04-06T17:03:03.001Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c6ede5f560a5b34012",
        "name": "diego lozano",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:02.710Z",
        "updatedAt": "2025-04-06T17:03:02.710Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c6ede5f560a5b34010",
        "name": "aba nsia opare",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:02.414Z",
        "updatedAt": "2025-04-06T17:03:02.414Z",
        "__v": 0
    },
    {
        "_id": "67f2b3c5ede5f560a5b3400e",
        "name": "karim abud villafuerte",
        "isDelete": false,
        "isActive": true,
        "createdAt": "2025-04-06T17:03:01.763Z",
        "updatedAt": "2025-04-06T17:03:01.763Z",
        "__v": 0
    }
]

let projects = [
    {
        "_id": "67f0013fd5ac2465971c19d4",
        "name": "test",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b2d5ac2465971c19cc",
        "name": "villamar",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b2d5ac2465971c19ca",
        "name": "villa marina lotes",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b1d5ac2465971c19c8",
        "name": "villa marina condos",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b1d5ac2465971c19c6",
        "name": "villa marina condo",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b1d5ac2465971c19c4",
        "name": "villa marina",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b0d5ac2465971c19c2",
        "name": "velamar village",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b0d5ac2465971c19c0",
        "name": "velamar fase iii",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000b0d5ac2465971c19be",
        "name": "velamar",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000afd5ac2465971c19bc",
        "name": "the crescent",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000afd5ac2465971c19ba",
        "name": "santa maria court",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000afd5ac2465971c19b8",
        "name": "riverside",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aed5ac2465971c19b6",
        "name": "puntarena",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aed5ac2465971c19b4",
        "name": "peninsula sur",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aed5ac2465971c19b2",
        "name": "peninsula",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000add5ac2465971c19b0",
        "name": "paseo de las casas",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000add5ac2465971c19ae",
        "name": "oceanlake",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000add5ac2465971c19ac",
        "name": "marine lodge",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000acd5ac2465971c19aa",
        "name": "marinazul",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000acd5ac2465971c19a8",
        "name": "marina village - t700",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000acd5ac2465971c19a6",
        "name": "marina village",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000abd5ac2465971c19a4",
        "name": "marina gardens",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000abd5ac2465971c19a2",
        "name": "mareas mall",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000abd5ac2465971c19a0",
        "name": "mare",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000abd5ac2465971c199e",
        "name": "lotes",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aad5ac2465971c199c",
        "name": "los portales",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aad5ac2465971c199a",
        "name": "lakeshore",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000aad5ac2465971c1998",
        "name": "laguna",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a9d5ac2465971c1996",
        "name": "hacienda del lago",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a9d5ac2465971c1994",
        "name": "greenview",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a9d5ac2465971c1992",
        "name": "greengarden",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a9d5ac2465971c1990",
        "name": "fairways",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a8d5ac2465971c198e",
        "name": "dunas residences",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a8d5ac2465971c198c",
        "name": "corotú golf villas",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a8d5ac2465971c198a",
        "name": "club state",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a7d5ac2465971c1988",
        "name": "casamar",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a7d5ac2465971c1986",
        "name": "bristol villas",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a6d5ac2465971c1984",
        "name": "bristol residences",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a6d5ac2465971c1982",
        "name": "altamar",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a6d5ac2465971c1980",
        "name": "alamar t-700",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f000a5d5ac2465971c197e",
        "name": "alamar t-600",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    }
]

let status = [
    {
        "_id": "67f001f72bdcae011e898328",
        "name": "reventa",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f001f72bdcae011e898326",
        "name": "alquilado",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f001f52bdcae011e898324",
        "name": "vendido",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f001f52bdcae011e898322",
        "name": "entregado",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f001f42bdcae011e898320",
        "name": "disponible",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f001f42bdcae011e89831e",
        "name": "reservado",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    }
]

let types =[
    {
        "_id": "67f0061a5cacdd40b61c6c96",
        "name": "casas",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f006195cacdd40b61c6c94",
        "name": "local",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f006175cacdd40b61c6c92",
        "name": "terrenos",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f006165cacdd40b61c6c90",
        "name": "terreno",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f006155cacdd40b61c6c8e",
        "name": "casa",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "67f0060e5cacdd40b61c6c8c",
        "name": "apartamento",
        "isDelete": false,
        "isActive": true,
        "__v": 0
    }
]




// Define the API endpoint
const API_URL = 'http://localhost:5000/inventory';
// const API_URL = 'http://localhost:5000/client';


// Function to read data from an Excel file
const readExcelData = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

// Function to upload data
const uploadInventoryData = async (filePath) => {
    try {
        const inventory = readExcelData(filePath);
        console.log('inventory',inventory)
        
        let c = []
        // let red = [...new Set(client)]
        let res = inventory.map((item)=>{
            // console.log('item',item.name.includes('Miguel Triana'))
            // if(item.clientId ==='Miguel Triana') console.log('item',item)
            let clientId = clients.filter((cl)=>{
                // if(item?.clientId?.trim()?.toLowerCase() === "miguel triana") console.log('item',item.clientId,cl.name)
                return item.clientId && cl.name?.trim()?.toLowerCase() === item.clientId?.trim()?.toLowerCase()})?.[0]
            // console.log('clientId',clientId?._id)
            // c.push(clientId?._id)
            console.log('clientId',clientId?._id)
            if ( clientId?._id) item.clientId = clientId?._id
            // item.clientId = clients.filter((cl)=>item.clientId && cl.name === item.clientId.toLowerCase())?.[0]?._id || 
            let projectId = projects.filter((cl)=>item.projectId && cl.name?.trim() === item.projectId?.trim()?.toLowerCase())?.[0]?._id
            if (projectId) item.projectId = projectId
            let statusId = status.filter((cl)=>item.statusId && cl.name?.trim() === item.statusId?.trim()?.toLowerCase())?.[0]?._id
            if(statusId) item.statusId = statusId

            let typeId = types.filter((cl)=>item.typeId && cl.name?.trim() === item.typeId?.trim()?.toLowerCase())?.[0]?._id
            if(typeId) item.typeId = typeId

            return item
        })
        
        await mongoose.connect('mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("db connected"));
        console.log("res",res)
        if(res.length){
            await Inventory.insertMany(res).then(function () {
                console.log("Data inserted")  // Success
            }).catch(function (error) {
                console.log('rdrError', error)      // Failure
            });
        }
        
        let index = 0
        // for (const provider of res) {
        //     const response =  await axios.post(API_URL, provider);
        //     // console.log(`Uploaded: ${provider?.name} - Status: ${response.status}`);
        //     console.log(index,`Uploaded: ${provider?.clientId} - Status: ${response.status}`);
        //     index++
        // }
        // console.log('All data uploaded successfully!');
    } catch (error) {
        console.error('Error uploading data:', error.message);
    }
};

// Execute the function with the Excel file path
uploadInventoryData('FINAL INVENTARIO (1).xlsx');

// ["RESERVADO",
//     "DISPONIBLE",
//     "ENTREGADO",
//     "VENDIDO",
//     "ALQUILADO",
//     ]

// import axios from 'axios'
// import xlsx from 'xlsx'
// import { formatString } from './helper.js';


// Data array
// const bank = [
//     "Atlas Bank",
//     "Bac International Bank, Inc.",
//     "Banco Aliado, S.A.",
//     "Banco Azteca (Panamá), S.A.",
//     "Banco Davivienda (Panamá), S.A.",
//     "Banco Delta, S.A. (BMF)",
//     "Pacific Bank, S.A.",
//     "Banco Ficohsa (Panamá), S.A.",
//     "Banco General, S.A.",
//     "Banco Internacional de Costa Rica, S.A. (Bicsa)",
//     "Banco Lafise Panamá, S.A.",
//     "Banco La Hipotecaria, S.A.",
//     "Banco Latinoamericano de Comercio Exterior, S.A. (Bladex)",
//     "Bancolombia (Sucursal Panamá)",
//     "Banco Nacional de Panamá.",
//     "Banco Pichincha Panamá S.A.",
//     "The Bank of Nova Scotia, Sucursal Panamá",
//     "Banesco (Panamá), S.A.",
//     "Banisi, S.A.",
//     "Banistmo, S.A.",
//     "Bank of China (Sucursal Panamá), S.A.",
//     "BBP Bank, S.A.",
//     "BCT Bank International, S.A.",
//     "Bi Bank, S.A.",
//     "Caja de Ahorros",
//     "Canal Bank, S.A.",
//     "Capital Bank, Inc.",
//     "Citibank, N.A. (Sucursal Panamá)",
//     "Credicorp Bank, S.A.",
//     "Keb Hana Bank",
//     "Global Bank Corporation",
//     "Mercantil Banco, S.A.",
//     "Mega International Commercial Bank Co., Ltd. (Mega Icbc)",
//     "Multibank, Inc.",
//     "Metrobank, S.A.",
//     "MMG Bank Corporation",
//     "Prival Bank, S.A.",
//     "St. Georges Bank",
//     "Towerbank International, Inc.",
//     "Unibank, S.A.",
//     "ASB BANK CORP.",
//     "Austrobank Overseas (Panamá), S.A.",
//     "Banco Credit Andorra (Panamá), S.A.",
//     "Banco de Bogotá (Panamá), S.A.",
//     "Banco de Crédito del Perú (Sucursal Panamá)",
//     "Banco de Occidente (Panamá), S.A.",
//     "Bancolombia (Panamá), S.A.",
//     "BHD International Bank (Panamá), S.A.",
//     "BPR Bank, S.A.",
//     "GNB Sudameris Bank, S.A.",
//     "Inteligo Bank, Ltd.",
//     "Itaú (Panamá), S.A.",
//     "Popular Bank Ltd., Inc."
//   ];

// let categories = [
//                     "Gastos Indirectos",
//                     "Trabajos Preliminares",
//                     "Indirectos de construcción ",
//                     "Infraestructura",
//                     "Fundaciones",
//                     "Estructura",
//                     "Albañilería",
//                     "Electromecánica",
//                     "Acabados",
//                     "Dispositivos Especiales",
//                     "Equipamiento"
//                   ]
//  let project= [
//     "Alamar T-600",
//     "Alamar T-700",
//     "Altamar",
//     "Bristol Residences",
//     "Bristol Villas",
//     "Casamar",
//     "Club State",
//     "Corotú Golf Villas",
//     "Dunas Residences",
//     "Fairways",
//     "Greengarden",
//     "Greenview",
//     "Hacienda Del Lago",
//     "Laguna",
//     "Lakeshore",
//     "Los Portales",
//     "Lotes",
//     "Mare",
//     "Mareas Mall",
//     "Marina Gardens",
//     "Marina Village",
//     "Marina Village - T700",
//     "Marinazul",
//     "Marine Lodge",
//     "Oceanlake",
//     "Paseo De Las Casas",
//     "Peninsula",
//     "Peninsula Sur",
//     "Puntarena",
//     "Riverside",
//     "Santa Maria Court",
//     "The Crescent",
//     "Velamar",
//     "Velamar Fase III",
//     "Velamar Village",
//     "Villa Marina",
//     "Villa Marina Condo",
//     "Villa Marina Condos",
//     "Villa Marina Lotes",
//     "Villamar"
//   ];


// let status =[
//     "Reservado",
//     "Disponible",
//     "Entregado",
//     "Vendido",
//     "Alquilado",
//     "Reventa"
//   ];
  

//   const propertyTypes = [
//     "Apartamento",
//     "Casa",
//     "Terreno",
//     "Terrenos",
//     "Local",
//     "Casas"
//   ]

// let array= [
//     "Karim Abud Villafuerte",
//     "Aba Nsia Opare",
//     "Diego Lozano",
//     "Jose Gabriel Almanza Rojas",
//     "Rosa La Spisa",
//     "Maria Raquel Vallarino",
//     "Carlos Ehrman",
//     "Armando Pulgar",
//     "Gustavo Pinilla",
//     "Sandra Chaves",
//     "Erika Candanedo De López",
//     "Gina Vallarino",
//     "Fernando Robleto",
//     "Anthony Salerno",
//     "Eduardo Tejeira",
//     "Augusto Tejeira",
//     "Miguel Adan",
//     "Francisco Marengo",
//     "César Fong",
//     "Alexandra Ortega",
//     "Jorge Ng",
//     "Carlos Allen",
//     "Raul Civiello",
//     "Carlos Gonzalez Zapateiro",
//     "Manuel Aizpurua",
//     "Roberto Luna",
//     "Harry Marin",
//     "Danny Pinska",
//     "Jorge Antonio Serrano Elias",
//     "Pablo Malacara",
//     "Rosa María De Cassino",
//     "Juan Pablo Duran",
//     "Mariuber Torres",
//     "Giancarlo Del Cioppo",
//     "Efren Cedeño",
//     "Brandon Sheehan",
//     "Juan Carlos Yi",
//     "Karen Buitrago Moreno",
//     "Raphael Wanjelik",
//     "Gian Marco Cordoba",
//     "Adrián Arias",
//     "Joseph Benaim",
//     "Félix Ruíz",
//     "Itza Lewis",
//     "Alonso Díaz",
//     "Benny Naimark",
//     "José Orillac",
//     "Demetrio Arosemena",
//     "Osiris Perez De Gutierrez",
//     "Raúl Spiegel",
//     "Andres Flores",
//     "Jessica Medina",
//     "Pascual Bonilla",
//     "Xiomara Stanziola",
//     "Ana Lucrecia De Zarak",
//     "Arturo Cochez",
//     "Alejandro Watson",
//     "Gloria Esther Martinelli De Virzi",
//     "Pavel Shkitin",
//     "Graciela Ojeda",
//     "Alexandra Mulino De Vallarino",
//     "Mateo Fabrega",
//     "Monique Mulino",
//     "Mario Tamayo",
//     "Andrés González Solanilla",
//     "Antonio Esteban Mock Luque",
//     "Miguel Fernández",
//     "Miguel Lezcano",
//     "María Teresa Castillo",
//     "Eduardo Espinosa",
//     "Marcela Santamaría",
//     "Nicolás Gaudiano",
//     "Maricel De Mulino",
//     "Mike Sedgwick",
//     "Winston Gonzalez",
//     "Gabriel Barletta",
//     "Irma Altamirano",
//     "Juan David Hoffman",
//     "Alejandra Lewis",
//     "Moises Chanis",
//     "Miguel Cedeño",
//     "Julio César Bonilla",
//     "Ana Tribaldos",
//     "Ana Archuleta",
//     "Luis Bandera",
//     "Jose Severino",
//     "Norman Velasquez",
//     "Luis Eduardo Arias",
//     "Luciana Salazar",
//     "Helios Navarro",
//     "Maria Cristina Fabrega Saez De Duque",
//     "Julio Spiegel",
//     "Rajesh Badlani",
//     "Ricky Salteiro",
//     "Victor Cubias",
//     "Ana Cruz",
//     "Luis Nuñez",
//     "Denis Vargas",
//     "Icela Tejeira",
//     "Danna Rocchio -",
//     "Jihann Pedersen",
//     "Antonio Cheong",
//     "Marisela Gioconda Ruiz",
//     "Euclides Effio Perez",
//     "Ramon Canalias",
//     "Javier E Irene Arias / Tenedera Arfa",
//     "Ana Lucia Herrera",
//     "Landy Guillen",
//     "Miguel Triana / Ana Maria Cristina Diaz",
//     "Rogelio Romero",
//     "Pedro Cordovez",
//     "Angie Beer",
//     "Maria Fernanda Diaz",
//     "Miguel Angel Carballeda",
//     "Leonardo González",
//     "Pedro Alvarado",
//     "Roberto Ricardo Lara",
//     "Martha Chen De Magdalena",
//     "Luis Fernando Chacon",
//     "Brandon William",
//     "Hector Soucy",
//     "Lorenzo Verlicchi",
//     "Manuel Grillo",
//     "Daniel Enrique Vivas Barrios",
//     "Marc Kublun",
//     "Martin Vanselow",
//     "Ana Maria Orjuela",
//     "Rogelio Moreno Sima",
//     "Plinio Rodríguez",
//     "Maria Alvarado",
//     "Maria José Sucre",
//     "Alfonso Wong Giannareas",
//     "Rosa Milagro De Fernandez",
//     "Sugeiry Rodriguez",
//     "Lorenzo Del Buey",
//     "Omar Rodriguez",
//     "Wayne Boehme",
//     "Ricardo Alfaro",
//     "Rogelio Rendon",
//     "Regulo Lopez",
//     "Lyle Huntoon",
//     "Mabel Moreno",
//     "Jenny Chen",
//     "Joel Rodríguez",
//     "Jacob Burnopp",
//     "Joaquin Jimenez",
//     "Armando Quintero",
//     "Vanessa Moreno",
//     "Inyira Canalias",
//     "Farah Molino",
//     "Augusto Hernandez",
//     "Rafael Prieto",
//     "Samarkanda Lay",
//     "Alicia Bañuelos",
//     "Adolfo Olloqui",
//     "Nelva Alvarez",
//     "Jorge Luis Lara Tejada",
//     "Vicente Liao",
//     "Lodge, Inc. Morris",
//     "Alejandro Fernández",
//     "Sharon Phillips",
//     "Analida Hageman",
//     "María De Pinto",
//     "Roberto Carretero",
//     "Felix Fallabella",
//     "Silvia Smith",
//     "Adrian Ratner",
//     "Katherine Ann Gadd",
//     "Carmenza Pelaez",
//     "Xiomara Davis Gumbs",
//     "Rita Liao Pan",
//     "José Molina",
//     "Jörg Medrow",
//     "Jorge Velez",
//     "Jaime Correa",
//     "Auristela Orozco",
//     "Yamileth Cedeño",
//     "Ines Medina",
//     "Melinda Arias De Morrice",
//     "Margarita Arias",
//     "Kent Keith",
//     "Jeremy Reynolds",
//     "Tacho Ruiz",
//     "Barbara Brustein",
//     "Fernando Perez",
//     "María Altagracia Álvarez",
//     "Ivan Jurado",
//     "Richard Toledano",
//     "Isaac Schwartz",
//     "Carlos Duboy",
//     "María Alejandra Campo",
//     "Edwin Cudyk",
//     "Bohdan Kopytko",
//     "Teresita García De Paredes",
//     "Luis Alejandro Palacios",
//     "Johnny Morales",
//     "Diana De La Guardia",
//     "Philippe Deltomme",
//     "Michail Ioffe",
//     "Robert Quartermaid",
//     "María Eugenia Suárez",
//     "Carlos Herrera",
//     "Estefania Zevallos",
//     "José Boyd",
//     "Francisco Perez Salamero",
//     "Alfonso Arias",
//     "Gerry Racicot",
//     "Juan Gabriel González",
//     "Ana Lorena Ortega",
//     "Norberto Hernandez",
//     "Arturo Miranda Castillo",
//     "Jorge Urbano",
//     "Juan Carlos Pinto",
//     "Anibal De Leon",
//     "Alejandro Riera",
//     "Roxana Patricia Alarcón De Mueller",
//     "Yesid Camelo",
//     "Rosella Bottone",
//     "Daniella Sacco",
//     "Francisco Zhong / Zhi Yin Liu",
//     "Luis Miguel Martin",
//     "Eugenio De Los Santos",
//     "Maria Elena Estrada",
//     "Katherine Lee Jiang",
//     "Isabel Flautero",
//     "Juana Corral / Martha Agudelo",
//     "Felix Yet",
//     "Luis Zou",
//     "Karen Barahona",
//     "Emmy Motta",
//     "Emerson Cano",
//     "Jacobo Coriat",
//     "Tatiana Buree",
//     "Ricky Calvo",
//     "Gustavo Garcia De Paredes",
//     "Antonio Miro",
//     "Juan Octavio Diaz",
//     "Ana Mae Diaz",
//     "Salomon Btesh",
//     "Eric Morales",
//     "Roberto Arauz",
//     "Sunil Hartono",
//     "Navia Sánchez De Wilson",
//     "Sebastien Van Hal",
//     "Zebulun Gadeloff",
//     "Caroline Howell",
//     "Fátima López",
//     "Jorge Cano",
//     "Victoria Aleman",
//     "Lior Ben Dor",
//     "John Thomas Kounelias",
//     "Finnian Kelly",
//     "Liron Soll",
//     "Tuira Torrijos",
//     "Tomas Guerra"
// ]


// let arrClient = [
//     "Karim Abud Villafuerte",
//     "Aba Nsia Opare",
//     "Diego Lozano",
//     "Jose Gabriel Almanza Rojas",
//     "Rosa La Spisa",
//     "Maria Raquel Vallarino",
//     "Carlos Ehrman",
//     "Armando Pulgar",
//     "Gustavo Pinilla",
//     "Sandra Chaves",
//     "Erika Candanedo De López",
//     "Gina Vallarino",
//     "Fernando Robleto",
//     "Anthony Salerno",
//     "Eduardo Tejeira",
//     "Augusto Tejeira",
//     "Miguel Adan",
//     "Francisco Marengo",
//     "César Fong",
//     "Alexandra Ortega",
//     "Jorge Ng",
//     "Carlos Allen",
//     "Raul Civiello",
//     "Carlos Gonzalez Zapateiro",
//     "Manuel Aizpurua",
//     "Roberto Luna",
//     "Harry Marin",
//     "Danny Pinska",
//     "Jorge Antonio Serrano Elias",
//     "Pablo Malacara",
//     "Rosa María De Cassino",
//     "Juan Pablo Duran",
//     "Mariuber Torres",
//     "Giancarlo Del Cioppo",
//     "Efren Cedeño",
//     "Brandon Sheehan",
//     "Juan Carlos Yi",
//     "Karen Buitrago Moreno",
//     "Raphael Wanjelik",
//     "Gian Marco Cordoba",
//     "Adrián Arias",
//     "Joseph Benaim",
//     "Félix Ruíz",
//     "Itza Lewis",
//     "Alonso Díaz",
//     "Benny Naimark",
//     "José Orillac",
//     "Demetrio Arosemena",
//     "Osiris Perez De Gutierrez",
//     "Raúl Spiegel",
//     "Andres Flores",
//     "Jessica Medina",
//     "Pascual Bonilla",
//     "Xiomara Stanziola",
//     "Ana Lucrecia De Zarak",
//     "Arturo Cochez",
//     "Alejandro Watson",
//     "Gloria Esther Martinelli De Virzi",
//     "Pavel Shkitin",
//     "Graciela Ojeda",
//     "Alexandra Mulino De Vallarino",
//     "Mateo Fabrega",
//     "Monique Mulino",
//     "Mario Tamayo",
//     "Andrés González Solanilla",
//     "Antonio Esteban Mock Luque",
//     "Miguel Fernández",
//     "Miguel Lezcano",
//     "María Teresa Castillo",
//     "Eduardo Espinosa",
//     "Marcela Santamaría",
//     "Nicolás Gaudiano",
//     "Maricel De Mulino",
//     "Mike Sedgwick",
//     "Winston Gonzalez",
//     "Gabriel Barletta",
//     "Irma Altamirano",
//     "Juan David Hoffman",
//     "Alejandra Lewis",
//     "Moises Chanis",
//     "Miguel Cedeño",
//     "Julio César Bonilla",
//     "Ana Tribaldos",
//     "Ana Archuleta",
//     "Luis Bandera",
//     "Jose Severino",
//     "Norman Velasquez",
//     "Luis Eduardo Arias",
//     "Luciana Salazar",
//     "Helios Navarro",
//     "Maria Cristina Fabrega Saez De Duque",
//     "Julio Spiegel",
//     "Rajesh Badlani",
//     "Ricky Salteiro",
//     "Victor Cubias",
//     "Ana Cruz",
//     "Luis Nuñez",
//     "Denis Vargas",
//     "Icela Tejeira",
//     "Danna Rocchio -",
//     "Jihann Pedersen",
//     "Antonio Cheong",
//     "Marisela Gioconda Ruiz",
//     "Euclides Effio Perez",
//     "Ramon Canalias",
//     "Javier E Irene Arias",
//     "Ana Lucia Herrera",
//     "Landy Guillen",
//     "Miguel Triana",
//     "Rogelio Romero",
//     "Pedro Cordovez",
//     "Angie Beer",
//     "Maria Fernanda Diaz",
//     "Miguel Angel Carballeda",
//     "Leonardo González",
//     "Pedro Alvarado",
//     "Roberto Ricardo Lara",
//     "Martha Chen De Magdalena",
//     "Luis Fernando Chacon",
//     "Brandon William",
//     "Hector Soucy",
//     "Lorenzo Verlicchi",
//     "Manuel Grillo",
//     "Daniel Enrique Vivas Barrios",
//     "Marc Kublun",
//     "Martin Vanselow",
//     "Ana Maria Orjuela",
//     "Rogelio Moreno Sima",
//     "Plinio Rodríguez",
//     "Maria Alvarado",
//     "Maria José Sucre",
//     "Alfonso Wong Giannareas",
//     "Rosa Milagro De Fernandez",
//     "Sugeiry Rodriguez",
//     "Lorenzo Del Buey",
//     "Omar Rodriguez",
//     "Wayne Boehme",
//     "Ricardo Alfaro",
//     "Rogelio Rendon",
//     "Regulo Lopez",
//     "Lyle Huntoon",
//     "Mabel Moreno",
//     "Jenny Chen",
//     "Joel Rodríguez",
//     "Jacob Burnopp",
//     "Joaquin Jimenez",
//     "Armando Quintero",
//     "Vanessa Moreno",
//     "Inyira Canalias",
//     "Farah Molino",
//     "Augusto Hernandez",
//     "Rafael Prieto",
//     "Samarkanda Lay",
//     "Alicia Bañuelos",
//     "Adolfo Olloqui",
//     "Nelva Alvarez",
//     "Jorge Luis Lara Tejada",
//     "Vicente Liao",
//     "Lodge, Inc. Morris",
//     "Alejandro Fernández",
//     "Sharon Phillips",
//     "Analida Hageman",
//     "María De Pinto",
//     "Roberto Carretero",
//     "Felix Fallabella",
//     "Silvia Smith",
//     "Adrian Ratner",
//     "Katherine Ann Gadd",
//     "Carmenza Pelaez",
//     "Xiomara Davis Gumbs",
//     "Rita Liao Pan",
//     "José Molina",
//     "Jörg Medrow",
//     "Jorge Velez",
//     "Jaime Correa",
//     "Auristela Orozco",
//     "Yamileth Cedeño",
//     "Ines Medina",
//     "Melinda Arias De Morrice",
//     "Margarita Arias",
//     "Kent Keith",
//     "Jeremy Reynolds",
//     "Tacho Ruiz",
//     "Barbara Brustein",
//     "Fernando Perez",
//     "María Altagracia Álvarez",
//     "Ivan Jurado",
//     "Richard Toledano",
//     "Isaac Schwartz",
//     "Carlos Duboy",
//     "María Alejandra Campo",
//     "Edwin Cudyk",
//     "Bohdan Kopytko",
//     "Teresita García De Paredes",
//     "Luis Alejandro Palacios",
//     "Johnny Morales",
//     "Diana De La Guardia",
//     "Philippe Deltomme",
//     "Michail Ioffe",
//     "Robert Quartermaid",
//     "María Eugenia Suárez",
//     "Carlos Herrera",
//     "Estefania Zevallos",
//     "José Boyd",
//     "Francisco Perez Salamero",
//     "Alfonso Arias",
//     "Gerry Racicot",
//     "Juan Gabriel González",
//     "Ana Lorena Ortega",
//     "Norberto Hernandez",
//     "Arturo Miranda Castillo",
//     "Jorge Urbano",
//     "Juan Carlos Pinto",
//     "Anibal De Leon",
//     "Alejandro Riera",
//     "Roxana Patricia Alarcón De Mueller",
//     "Yesid Camelo",
//     "Rosella Bottone",
//     "Daniella Sacco",
//     "Francisco Zhong",
//     "Luis Miguel Martin",
//     "Eugenio De Los Santos",
//     "Maria Elena Estrada",
//     "Katherine Lee Jiang",
//     "Isabel Flautero",
//     "Juana Corral",
//     "Felix Yet",
//     "Luis Zou",
//     "Karen Barahona",
//     "Emmy Motta",
//     "Emerson Cano",
//     "Jacobo Coriat",
//     "Tatiana Buree",
//     "Ricky Calvo",
//     "Gustavo Garcia De Paredes",
//     "Antonio Miro",
//     "Juan Octavio Diaz",
//     "Ana Mae Diaz",
//     "Salomon Btesh",
//     "Eric Morales",
//     "Roberto Arauz",
//     "Sunil Hartono",
//     "Navia Sánchez De Wilson",
//     "Sebastien Van Hal",
//     "Zebulun Gadeloff",
//     "Caroline Howell",
//     "Fátima López",
//     "Jorge Cano",
//     "Victoria Aleman",
//     "Lior Ben Dor",
//     "John Thomas Kounelias",
//     "Finnian Kelly",
//     "Liron Soll",
//     "Tuira Torrijos",
//     "Tomas Guerra"
// ];

// // Total unique names: 230



// // Define the API endpoint
// const API_URL = 'http://localhost:5000/client';

// // Convert array to object format
// const providers = arrClient.map(category => ({ name: formatString(category) }));

// // Function to upload data
// const uploadData = async () => {
//     try {
//         for (const provider of providers) {
//             const response = await axios.post(API_URL, provider);
//             console.log(`Uploaded: ${provider.name} - Status: ${response.status}`);
//         }
//         console.log('All data uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading data:', error.message);
//     }
// };

// // Execute the function
// uploadData();


// const namesList = [
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Karim Abud Villafuerte", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Aba Nsia Opare", "Nan", "Nan", "Diego Lozano", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Jose Gabriel Almanza Rojas", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Rosa La Spisa", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Maria Raquel Vallarino", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Carlos Ehrman", "Nan", "Armando Pulgar",
//     "Gustavo Pinilla", "Sandra Chaves", "Erika Candanedo De López", "Gina Vallarino", "Fernando Robleto", "Anthony Salerno",
//     "Eduardo Tejeira", "Augusto Tejeira", "Miguel Adan", "Francisco Marengo", "César Fong", "Alexandra Ortega", "Jorge Ng",
//     "Carlos Allen", "Raul Civiello", "Carlos Gonzalez Zapateiro", "Manuel Aizpurua", "Roberto Luna", "Roberto Luna",
//     "Harry Marin", "Danny Pinska", "Jorge Antonio Serrano Elias", "Pablo Malacara", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Rosa María De Cassino", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Juan Pablo Duran", "Mariuber Torres", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Giancarlo Del Cioppo", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Efren Cedeño", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Brandon Sheehan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Juan Carlos Yi", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Karen Buitrago Moreno", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Raphael Wanjelik", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Gian Marco Cordoba", "Raphael Wanjelik", "Nan",
//     "Carlos Allen", "Nan", "Adrián Arias", "Nan", "Joseph Benaim", "Félix Ruíz", "Itza Lewis", "Alonso Díaz", "Alonso Díaz",
//     "Benny Naimark", "Nan", "José Orillac", "Demetrio Arosemena", "Osiris Perez De Gutierrez", "Raúl Spiegel",
//     "Pablo Malacara", "Andres Flores", "Jessica Medina", "Pascual Bonilla", "Xiomara Stanziola", "Pablo Malacara",
//     "Ana Lucrecia De Zarak", "Carlos Allen", "Arturo Cochez", "Arturo Cochez", "Alejandro Watson",
//     "Gloria Esther Martinelli De Virzi", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Pavel Shkitin", "Graciela Ojeda", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Alexandra Mulino De Vallarino", "Nan", "Mateo Fabrega", "Monique Mulino", "Nan", "Nan", "Mario Tamayo", "Nan",
//     "Andrés González Solanilla", "Antonio Esteban Mock Luque", "Miguel Fernández", "Miguel Lezcano", "María Teresa Castillo",
//     "Eduardo Espinosa", "Gustavo Pinilla", "Marcela Santamaría", "Nicolás Gaudiano", "Maricel De Mulino", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Mike Sedgwick", "Winston Gonzalez", "Gabriel Barletta", "Irma Altamirano", "Juan David Hoffman",
//     "Alejandra Lewis", "Moises Chanis", "Miguel Cedeño", "Julio César Bonilla", "Ana Tribaldos", "Ana Archuleta",
//     "Luis Bandera", "Jose Severino", "Norman Velasquez", "Luis Eduardo Arias", "Luciana Salazar", "Helios Navarro",
//     "Maria Cristina Fabrega Saez De Duque", "Julio Spiegel", "Rajesh Badlani", "Ricky Salteiro", "Victor Cubias",
//     "Joseph Benaim", "Ana Cruz", "Luis Nuñez", "Denis Vargas", "Icela Tejeira", "Danna Rocchio -", "Jihann Pedersen",
//     "Antonio Cheong", "Marisela Gioconda Ruiz", "Euclides Effio Perez", "Ramon Canalias",
//     "Javier E Irene Arias / Tenedera Arfa", "Ana Lucia Herrera", "Landy Guillen", "Miguel Triana / Ana Maria Cristina Diaz",
//     "Rogelio Romero", "Pedro Cordovez", "Angie Beer", "Maria Fernanda Diaz", "Miguel Angel Carballeda", "Leonardo González",
//     "Pedro Alvarado", "Roberto Ricardo Lara", "Martha Chen De Magdalena", "Luis Fernando Chacon", "Brandon William",
//     "Hector Soucy", "Lorenzo Verlicchi", "Mario Tamayo", "Manuel Grillo", "Daniel Enrique Vivas Barrios", "Marc Kublun",
//     "Martin Vanselow", "Ana Maria Orjuela", "Rogelio Moreno Sima", "Plinio Rodríguez", "Maria Alvarado", "Maria Alvarado",
//     "Maria José Sucre", "Alfonso Wong Giannareas", "Rosa Milagro De Fernandez", "Sugeiry Rodriguez", "Lorenzo Del Buey",
//     "Omar Rodriguez", "Wayne Boehme", "Ricardo Alfaro", "Rogelio Rendon", "Regulo Lopez", "Lyle Huntoon", "Mabel Moreno",
//     "Jenny Chen", "Joel Rodríguez", "Jacob Burnopp", "Joaquin Jimenez", "Armando Quintero", "Vanessa Moreno",
//     "Inyira Canalias", "Farah Molino", "Augusto Hernandez", "Rafael Prieto", "Samarkanda Lay", "Alicia Bañuelos",
//     "Adolfo Olloqui", "Nelva Alvarez", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Jorge Luis Lara Tejada",
//     "Mike Sedgwick", "Nan", "Nan", "Nan", "Vicente Liao", "Nan", "Nan", "Lodge, Inc. Morris", "Alejandro Fernández",
//     "Nan", "Nan", "Nan", "Nan", "Ana Cruz", "Nan", "Sharon Phillips", "Sharon Phillips", "Wayne Boehme", "Analida Hageman",
//     "María De Pinto", "Roberto Carretero", "Felix Fallabella", "Lodge, Inc. Morris", "Silvia Smith", "Adrian Ratner",
//     "Katherine Ann Gadd", "Carmenza Pelaez", "Xiomara Davis Gumbs", "Rita Liao Pan", "José Molina", "Jörg Medrow",
//     "Alejandro Fernández", "Jorge Velez", "Jaime Correa", "Auristela Orozco", "Yamileth Cedeño", "Ines Medina",
//     "Melinda Arias De Morrice", "Margarita Arias", "Sharon Phillips", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Kent Keith", "Jeremy Reynolds", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Tacho Ruiz", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Barbara Brustein", "Nan", "Nan", "Fernando Perez", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "María Altagracia Álvarez", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Ivan Jurado", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Richard Toledano", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Isaac Schwartz", "Nan", "Carlos Duboy", "María Alejandra Campo", "Edwin Cudyk", "Bohdan Kopytko",
//     "Teresita García De Paredes", "Luis Alejandro Palacios", "Johnny Morales", "Diana De La Guardia", "Philippe Deltomme",
//     "Michail Ioffe", "Robert Quartermaid", "María Eugenia Suárez", "Carlos Herrera", "Estefania Zevallos", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "José Boyd", "Nan", "Nan", "Nan", "Francisco Perez Salamero", "Nan", "Alfonso Arias", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Gerry Racicot",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Juan Gabriel González", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Carlos Allen", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Ana Lorena Ortega", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Norberto Hernandez", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Arturo Miranda Castillo", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Jorge Urbano", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Juan Carlos Pinto", "Anibal De Leon", "Nan", "Nan", "Nan",
//     "Nan", "Alejandro Riera", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Roxana Patricia Alarcón De Mueller", "Nan", "Yesid Camelo", "Nan", "Nan", "Nan", "Rosella Bottone",
//     "Daniella Sacco", "Pascual Bonilla", "Francisco Zhong / Zhi Yin Liu", "Luis Miguel Martin", "Eugenio De Los Santos",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Maria Elena Estrada", "Katherine Lee Jiang", "Isabel Flautero",
//     "Juana Corral / Martha Agudelo", "Felix Yet", "Luis Zou", "Karen Barahona", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Emmy Motta", "Emerson Cano", "Jacobo Coriat", "Tatiana Buree", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Ricky Calvo", "Gustavo Garcia De Paredes", "Antonio Miro", "Maria Raquel Vallarino", "Maria Raquel Vallarino",
//     "Juan Octavio Diaz", "Juan Octavio Diaz", "Ana Mae Diaz", "Samarkanda Lay", "Samarkanda Lay", "Salomon Btesh",
//     "Eric Morales", "Carlos Gonzalez Zapateiro", "Roberto Arauz", "Sunil Hartono", "Navia Sánchez De Wilson",
//     "Pedro Cordovez", "Sebastien Van Hal", "Zebulun Gadeloff", "Salomon Btesh", "Caroline Howell", "Fátima López", "Nan",
//     "Nan", "Caroline Howell", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Caroline Howell",
//     "Nan", "Nan", "Nan", "Jorge Cano", "Nan", "Victoria Aleman", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Lior Ben Dor", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Lior Ben Dor", "Lior Ben Dor", "Lior Ben Dor", "Lior Ben Dor", "John Thomas Kounelias", "Finnian Kelly",
//     "Finnian Kelly", "Nan", "Caroline Howell", "Nan", "Liron Soll", "Tuira Torrijos", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan",
//     "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Tomas Guerra", "Nan", "Nan", "Nan"
// ];
// let array= [
//     "Karim Abud Villafuerte",
//     "Aba Nsia Opare",
//     "Diego Lozano",
//     "Jose Gabriel Almanza Rojas",
//     "Rosa La Spisa",
//     "Maria Raquel Vallarino",
//     "Carlos Ehrman",
//     "Armando Pulgar",
//     "Gustavo Pinilla",
//     "Sandra Chaves",
//     "Erika Candanedo De López",
//     "Gina Vallarino",
//     "Fernando Robleto",
//     "Anthony Salerno",
//     "Eduardo Tejeira",
//     "Augusto Tejeira",
//     "Miguel Adan",
//     "Francisco Marengo",
//     "César Fong",
//     "Alexandra Ortega",
//     "Jorge Ng",
//     "Carlos Allen",
//     "Raul Civiello",
//     "Carlos Gonzalez Zapateiro",
//     "Manuel Aizpurua",
//     "Roberto Luna",
//     "Harry Marin",
//     "Danny Pinska",
//     "Jorge Antonio Serrano Elias",
//     "Pablo Malacara",
//     "Rosa María De Cassino",
//     "Juan Pablo Duran",
//     "Mariuber Torres",
//     "Giancarlo Del Cioppo",
//     "Efren Cedeño",
//     "Brandon Sheehan",
//     "Juan Carlos Yi",
//     "Karen Buitrago Moreno",
//     "Raphael Wanjelik",
//     "Gian Marco Cordoba",
//     "Adrián Arias",
//     "Joseph Benaim",
//     "Félix Ruíz",
//     "Itza Lewis",
//     "Alonso Díaz",
//     "Benny Naimark",
//     "José Orillac",
//     "Demetrio Arosemena",
//     "Osiris Perez De Gutierrez",
//     "Raúl Spiegel",
//     "Andres Flores",
//     "Jessica Medina",
//     "Pascual Bonilla",
//     "Xiomara Stanziola",
//     "Ana Lucrecia De Zarak",
//     "Arturo Cochez",
//     "Alejandro Watson",
//     "Gloria Esther Martinelli De Virzi",
//     "Pavel Shkitin",
//     "Graciela Ojeda",
//     "Alexandra Mulino De Vallarino",
//     "Mateo Fabrega",
//     "Monique Mulino",
//     "Mario Tamayo",
//     "Andrés González Solanilla",
//     "Antonio Esteban Mock Luque",
//     "Miguel Fernández",
//     "Miguel Lezcano",
//     "María Teresa Castillo",
//     "Eduardo Espinosa",
//     "Marcela Santamaría",
//     "Nicolás Gaudiano",
//     "Maricel De Mulino",
//     "Mike Sedgwick",
//     "Winston Gonzalez",
//     "Gabriel Barletta",
//     "Irma Altamirano",
//     "Juan David Hoffman",
//     "Alejandra Lewis",
//     "Moises Chanis",
//     "Miguel Cedeño",
//     "Julio César Bonilla",
//     "Ana Tribaldos",
//     "Ana Archuleta",
//     "Luis Bandera",
//     "Jose Severino",
//     "Norman Velasquez",
//     "Luis Eduardo Arias",
//     "Luciana Salazar",
//     "Helios Navarro",
//     "Maria Cristina Fabrega Saez De Duque",
//     "Julio Spiegel",
//     "Rajesh Badlani",
//     "Ricky Salteiro",
//     "Victor Cubias",
//     "Ana Cruz",
//     "Luis Nuñez",
//     "Denis Vargas",
//     "Icela Tejeira",
//     "Danna Rocchio -",
//     "Jihann Pedersen",
//     "Antonio Cheong",
//     "Marisela Gioconda Ruiz",
//     "Euclides Effio Perez",
//     "Ramon Canalias",
//     "Javier E Irene Arias / Tenedera Arfa",
//     "Ana Lucia Herrera",
//     "Landy Guillen",
//     "Miguel Triana / Ana Maria Cristina Diaz",
//     "Rogelio Romero",
//     "Pedro Cordovez",
//     "Angie Beer",
//     "Maria Fernanda Diaz",
//     "Miguel Angel Carballeda",
//     "Leonardo González",
//     "Pedro Alvarado",
//     "Roberto Ricardo Lara",
//     "Martha Chen De Magdalena",
//     "Luis Fernando Chacon",
//     "Brandon William",
//     "Hector Soucy",
//     "Lorenzo Verlicchi",
//     "Manuel Grillo",
//     "Daniel Enrique Vivas Barrios",
//     "Marc Kublun",
//     "Martin Vanselow",
//     "Ana Maria Orjuela",
//     "Rogelio Moreno Sima",
//     "Plinio Rodríguez",
//     "Maria Alvarado",
//     "Maria José Sucre",
//     "Alfonso Wong Giannareas",
//     "Rosa Milagro De Fernandez",
//     "Sugeiry Rodriguez",
//     "Lorenzo Del Buey",
//     "Omar Rodriguez",
//     "Wayne Boehme",
//     "Ricardo Alfaro",
//     "Rogelio Rendon",
//     "Regulo Lopez",
//     "Lyle Huntoon",
//     "Mabel Moreno",
//     "Jenny Chen",
//     "Joel Rodríguez",
//     "Jacob Burnopp",
//     "Joaquin Jimenez",
//     "Armando Quintero",
//     "Vanessa Moreno",
//     "Inyira Canalias",
//     "Farah Molino",
//     "Augusto Hernandez",
//     "Rafael Prieto",
//     "Samarkanda Lay",
//     "Alicia Bañuelos",
//     "Adolfo Olloqui",
//     "Nelva Alvarez",
//     "Jorge Luis Lara Tejada",
//     "Vicente Liao",
//     "Lodge, Inc. Morris",
//     "Alejandro Fernández",
//     "Sharon Phillips",
//     "Analida Hageman",
//     "María De Pinto",
//     "Roberto Carretero",
//     "Felix Fallabella",
//     "Silvia Smith",
//     "Adrian Ratner",
//     "Katherine Ann Gadd",
//     "Carmenza Pelaez",
//     "Xiomara Davis Gumbs",
//     "Rita Liao Pan",
//     "José Molina",
//     "Jörg Medrow",
//     "Jorge Velez",
//     "Jaime Correa",
//     "Auristela Orozco",
//     "Yamileth Cedeño",
//     "Ines Medina",
//     "Melinda Arias De Morrice",
//     "Margarita Arias",
//     "Kent Keith",
//     "Jeremy Reynolds",
//     "Tacho Ruiz",
//     "Barbara Brustein",
//     "Fernando Perez",
//     "María Altagracia Álvarez",
//     "Ivan Jurado",
//     "Richard Toledano",
//     "Isaac Schwartz",
//     "Carlos Duboy",
//     "María Alejandra Campo",
//     "Edwin Cudyk",
//     "Bohdan Kopytko",
//     "Teresita García De Paredes",
//     "Luis Alejandro Palacios",
//     "Johnny Morales",
//     "Diana De La Guardia",
//     "Philippe Deltomme",
//     "Michail Ioffe",
//     "Robert Quartermaid",
//     "María Eugenia Suárez",
//     "Carlos Herrera",
//     "Estefania Zevallos",
//     "José Boyd",
//     "Francisco Perez Salamero",
//     "Alfonso Arias",
//     "Gerry Racicot",
//     "Juan Gabriel González",
//     "Ana Lorena Ortega",
//     "Norberto Hernandez",
//     "Arturo Miranda Castillo",
//     "Jorge Urbano",
//     "Juan Carlos Pinto",
//     "Anibal De Leon",
//     "Alejandro Riera",
//     "Roxana Patricia Alarcón De Mueller",
//     "Yesid Camelo",
//     "Rosella Bottone",
//     "Daniella Sacco",
//     "Francisco Zhong / Zhi Yin Liu",
//     "Luis Miguel Martin",
//     "Eugenio De Los Santos",
//     "Maria Elena Estrada",
//     "Katherine Lee Jiang",
//     "Isabel Flautero",
//     "Juana Corral / Martha Agudelo",
//     "Felix Yet",
//     "Luis Zou",
//     "Karen Barahona",
//     "Emmy Motta",
//     "Emerson Cano",
//     "Jacobo Coriat",
//     "Tatiana Buree",
//     "Ricky Calvo",
//     "Gustavo Garcia De Paredes",
//     "Antonio Miro",
//     "Juan Octavio Diaz",
//     "Ana Mae Diaz",
//     "Salomon Btesh",
//     "Eric Morales",
//     "Roberto Arauz",
//     "Sunil Hartono",
//     "Navia Sánchez De Wilson",
//     "Sebastien Van Hal",
//     "Zebulun Gadeloff",
//     "Caroline Howell",
//     "Fátima López",
//     "Jorge Cano",
//     "Victoria Aleman",
//     "Lior Ben Dor",
//     "John Thomas Kounelias",
//     "Finnian Kelly",
//     "Liron Soll",
//     "Tuira Torrijos",
//     "Tomas Guerra"
// ]


// // Step 1: Count total entries
// const totalCount = namesList.length;
// console.log(`Total entries: ${totalCount}`); // 1076

// // Step 2: Filter out "Nan" and remove duplicates
// const uniqueNames = [...new Set(namesList.filter(name => name !== "Nan"))];
// console.log(`Unique names count (excluding Nan): ${uniqueNames.length}`); // Should be around 231
// console.log('Unique names array:', array.length); // Display the unique names array




