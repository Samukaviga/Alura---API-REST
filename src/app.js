import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("conexao com o banco feita com sucesso");
});


const app = express();
app.use(express.json()); //recurso do empress que vai ajudar a interpretar oq ta chegando via POST ou PUT
routes(app);

app.use(manipuladorDeErros);

export default app;





/*
const livros = [
    {"id": 1, "titulo": "Senhor dos Aneis"},
    {"id": 2, "titulo": "O Hobbit"}
]
*/