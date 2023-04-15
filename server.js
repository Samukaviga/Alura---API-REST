//npm init -y criacao do package.json
//instalando NPM (biblioteca) npm install nodemon@2.0.15 -D, para fazer autoreload no servidor ao salvar arquivos
// npm install express@4.17.3
// npm run dev
//npm install mongoose@6.2.6
// npm install dotenv@16.0.3
// npm init @eslint/config  // npx eslint ./src --fix Coloca ; nos arquivos do projeto 
import "dotenv/config"; //para que o dotenv faca suas configuracoes de VAR de ambiente 
import app from "./src/app.js";
const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});