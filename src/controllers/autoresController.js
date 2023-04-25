import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try{
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch(erro){
      next(erro);
    }

  };

  static listarAutorPorId = async (req, res, next) => {
    try{
      let id = req.params.id;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null){
        res.status(200).send(autorResultado);
      }else {
        next(new NaoEncontrado("Id do Autor nao encontrado"));
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
      const autorResposta = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorResposta !== null){
        res.status(200).send({message: "Autor atualizado com sucesso!"});
      } else {
        next(new NaoEncontrado("Id do Autor nao encontrado"));
      }    
    } catch(erro){
      next(erro);
    }

  };

  static deletarAutor = async (req, res, next) => {
    try{
      let id = req.params.id;
      const autorResposta = await autores.findByIdAndDelete(id);
      
      if(autorResposta !== null){
        res.status(200).send({message: "Autor deletado com sucesso!"});
      } else {
        next(new NaoEncontrado("Id do Autor nao encontrado"));
      }
    } catch(erro){
      next(erro);
    } 
  };

}


export default AutorController;