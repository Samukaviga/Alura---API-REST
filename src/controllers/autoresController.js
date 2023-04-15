import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    let id = req.params.id;

    autores.findById(id, (err, livros) => {
      if(err){
        res.status(500).send({message: `${err.message} - Erro ao buscar Autor`});
      } else {
        res.status(200).send(livros);
      }
    });

  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      if(err){
        res.status(500).send({message: `${err.message} - Erro ao cadastrar o Autor`});
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    let id = req.params.id;

    autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        res.status(500).send({message: `${err} - Nao foi possivel atualizadar o livro`});
      }
    });

  };

  static deletarAutor = (req, res) => {
    let id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: "Autor excluido com sucesso"});
      } else {
        res.status(500).send({message: `${err.message} - Falha ao excluir Autor`});
      }
    });

  };

}


export default AutorController;