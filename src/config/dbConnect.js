import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Alura:123@alura.lzjciqx.mongodb.net/alura-node?");

let db = mongoose.connection;

export default db;