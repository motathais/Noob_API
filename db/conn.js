const mongoose = require("mongoose")

require("dotenv").config()

async function main() {

    if (process.env.NODE_ENV === 'test') return;

    try {

        mongoose.set("strictQuery", true);

        await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.mhidlx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

        console.log("Conectado com sucesso!");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }

}

module.exports = main;

