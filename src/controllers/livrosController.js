import livros from "../models/Livro.js";

class LivroController {


  static listarLivros = async (req, res) => {
    try{
      const livrosResposta = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResposta);
    } catch(erro){
      res.status(500).send({message: "Erro com o servidor."});
    }
  };

  static listarLivroPorId = async (req, res) => {
    try{
      const id = req.params.id;

      const livroResposta = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livroResposta);
    }catch(erro){
      res.status(500).send({message: "Erro com o servidor"});
    }

  };

  static cadastrarLivro = async (req, res) => {
    try{
      let livro = new livros(req.body);

      const livroResposta = await livro.save();
      res.status(201).send(livroResposta.toJSON()); //converte em JSON
    } catch(erro){
      res.status(500).send({message: "Erro ao cadastrar livro."});
    }
  };

  static atualizarLivro = async (req, res) => {
    try{
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso."});
    }  catch(erro){
      res.status(500).send({message: "Erro ao atualizar o livro."});
    }
  };

  static excluirLivro = async (req, res) => {
    try{
      const id = req.params.id;

      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro excluido com sucesso."});
    } catch(erro){
      res.status(500).send({message: "Erro ao excluir o livro"});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try{
      const editora = req.query.editora;
 
      const livroResposta = await livros.find({"editora": editora}, {});
      res.status(200).send(livroResposta);
    } catch(erro){
      res.status(400).send({message: "Erro ao buscar livro por editora."});
    }

  };

}

export default LivroController;