const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');


app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json());

// Set up multer for file uploads

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// importando dados do .env

require("dotenv").config({ path: './env/.env' });

const port = process.env.PORT;


//configurando cloudinary

const cloudinary = require("./cloudinary/cloudinary");


// DB Connection

const conn = require("./db/conn");

conn();


// Configuração do Swagger

const setupSwagger = require("./swagger/swagger");

setupSwagger(app);


//Routes

const routes = require("./routes/router");

app.use("/api", routes);

app.listen(port, function () {
    console.log(`Servidor Online na porta ${port}`)
});

 





