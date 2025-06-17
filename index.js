const express = require("express");
const dotenv = require('dotenv');
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const tripsRouter = require("./router/tripsRouter");
const connectDB = require('./configs/db');
// Récupération fichier environnement
dotenv.config();

const app = express();
const port = 3000;
const cors = require("cors");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connexion à la base de données
connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(expressLayout);
app.set("layout", "base");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(cors());

app.use("/api/trips", tripsRouter);

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
