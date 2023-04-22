import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) { //Middleware de erro do express
  if(erro instanceof mongoose.Error.CastError){  //Erro de conversao
    new RequisicaoIncorreta().enviarResposta(res); 
  } else if(erro instanceof mongoose.Error.ValidationError){ //Quando houver um erro de validacao  
    new ErroValidacao(erro).enviarResposta(res);  
  } else if (erro instanceof NaoEncontrado){
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }

}

export default manipuladorDeErros;