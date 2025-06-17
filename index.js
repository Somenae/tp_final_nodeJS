const express = require("express");
const methodOverride = require("method-override");
const dotenv = require('dotenv');
const expressLayout = require("express-ejs-layouts");
const tripsRouter = require("./router/tripsRouter");
const connectDB = require('./configs/db');
const cors = require("cors");
// Récupération fichier environnement
dotenv.config();

const app = express();
const port = 3000;

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}));

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
