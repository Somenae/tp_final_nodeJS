const express = require("express");
const methodOverride = require("method-override");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const expressLayout = require("express-ejs-layouts");
const tripsRouter = require("./router/tripsRouter");
const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const registrationsRouter = require('./router/registrationsRouter');
const paymentsRouter = require('./router/paymentsRouter');
const documentsRouter = require('./router/documentsRouter');
const connectDB = require('./configs/db');
const cors = require("cors");
const { setUserDatas } = require("./middleware/auth");

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

app.use(cookieParser());
app.use(setUserDatas);

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
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/registrations", registrationsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/documents", documentsRouter);

app.listen(port, () => {
  console.log(`Server run  http://localhost:${port}`);
});
