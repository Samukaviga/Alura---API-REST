import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) { //Middleware de erro do express
  if(erro instanceof mongoose.Error.CastError){  //Erro de conversao
    res.status(400).send({message: "Um ou mais dados fornecidos estao incorretos."});
  }else {
    res.status(500).json({message: `${erro.message} - Erro interno no servidor.`});
  }
  
}

export default manipuladorDeErros;