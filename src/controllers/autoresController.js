import mongoose from "mongoose";
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

  static listarAutorPorId = async (req, res) => {
    try{
      let id = req.params.id;
      const autorResultado = await autores.findById(id);
      if(autorResultado !== null){
        res.status(200).send(autorResultado);
      }else {
        res.status(404).send({message: "Id do Autor nao encontrado"});
      }
    } catch (erro) {
      if(erro instanceof mongoose.Error.CastError){  //Erro de conversao
        res.status(400).send({message: "Um ou mais dados fornecidos estao incorretos."});
      }else {
        res.status(500).json({message: `${erro.message} - Erro interno no servidor.`});
      }
      
    }

  };

  static cadastrarAutor = async (req, res) => {
    
    try{
      let autor = new autores(req.body);
      const autorResposta = await autor.save();
      res.status(201).send(autorResposta.toJson());
    } catch(erro){
      res.status(500).json({message: `${erro.message} - Erro ao cadastrar`});
    }

  };

  static atualizarAutor = async (req, res) => {
    try{
      let id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso!"});      
    } catch(erro){
      res.status(500).send({message: "Erro ao cadastrar"});
    }

  };

  static deletarAutor = async (req, res) => {
    
    try{
      let id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor deletado com sucesso!"});
    } catch(erro){
      res.status(500).send({message: "Erro ao excluir "});
    } 

  
  };

}


export default AutorController;