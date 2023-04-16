import livros from "../models/Livro.js";

class LivroController {


  static listarLivros = async (req, res, next) => {
    try{
      const livrosResposta = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResposta);
    } catch(erro){
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try{
      const id = req.params.id;

      const livroResposta = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livroResposta);
    }catch(erro){
      next(erro);
    }

  };

  static cadastrarLivro = async (req, res, next) => {
    try{
      let livro = new livros(req.body);

      const livroResposta = await livro.save();
      res.status(201).send(livroResposta.toJSON()); //converte em JSON
    } catch(erro){
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso."});
    }  catch(erro){
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      const id = req.params.id;

      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro excluido com sucesso."});
    } catch(erro){
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try{
      const editora = req.query.editora;
 
      const livroResposta = await livros.find({"editora": editora}, {});
      res.status(200).send(livroResposta);
    } catch(erro){
      next(erro);
    }

  };

}

export default LivroController;