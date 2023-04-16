import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try{
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch(erro){
      res.status(500).json({message: `${erro.message} - Erro interno no servidor.`});
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try{
      let id = req.params.id;
      const autorResultado = await autores.findById(id);
      if(autorResultado !== null){
        res.status(200).send(autorResultado);
      }else {
        res.status(404).send({message: "Id do Autor nao encontrado"});
      }
    } catch (erro) {
      next(erro); //encaminha o erro para o middleware de tratamento de erro
    }

  };

  static cadastrarAutor = async (req, res, next) => {
    
    try{
      let autor = new autores(req.body);
      const autorResposta = await autor.save();
      res.status(201).send(autorResposta.toJson());
    } catch(erro){
      next(erro);
    }

  };

  static atualizarAutor = async (req, res, next) => {
    try{
      let id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso!"});      
    } catch(erro){
      next(erro);
    }

  };

  static deletarAutor = async (req, res, next) => {
    
    try{
      let id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor deletado com sucesso!"});
    } catch(erro){
      next(erro);
    } 

  
  };

}


export default AutorController;