import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const conn = {
    isConnected: false
};

const passwordMongo = process.env.PASSWORD_MONGO;
export default async function connectDB() {
    if (conn.isConnected) return;
//mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority
const db = await mongoose.connect(`mongodb+srv://francogalbiati984:${passwordMongo}@cluster0.t85pn3y.mongodb.net/`);
    const dbName = mongoose.connection.name;
    console.log(`Conectado a la base de datos: ${dbName}`);
    conn.isConnected = db.connections[0].readyState;
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose está conectado");
});

mongoose.connection.on("error", (err) => {
    console.error("Error al conectar con Mongoose:", err);
});
