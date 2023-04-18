import RequisicaoIncorreta from "./RequisicaoIncorreta.js";


class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro){

    const mensagemErro = Object.values(erro.errors) //Returna um array
      .map(erro => erro.message) //nesse array é implementado um Map para retornar o campo (message)
      .join("; "); //junta cada um dos elemento do array

    super(`Os seguintes error foram encontrados: ${mensagemErro}`);
  }
}

export default ErroValidacao;