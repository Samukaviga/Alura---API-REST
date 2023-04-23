import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

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

      if(livroResposta !== null){
        res.status(200).send(livroResposta);
      }else{
        next(new NaoEncontrado("Id do livro nao encontrado."));
      }
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
      const livroResposta = await livros.findByIdAndUpdate(id, {$set: req.body});
      
      if(livroResposta !== null){
        res.status(200).send({message: "Livro atualizado com sucesso."});
      } else {
        next(new NaoEncontrado("Id do livro nao encontrado."));
      }
    }  catch(erro){
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResposta = await livros.findByIdAndDelete(id);

      if(livroResposta !== null){
        res.status(200).send({message: "Livro excluido com sucesso."});
      } else {
        next(new NaoEncontrado("Id do livro nao encontrado."));
      }
    } catch(erro){
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try{
      
      const busca = await processaBusca(req.query);

      const livroResposta = await livros
        .find(busca)
        .populate("autor");

      res.status(200).send(livroResposta);
    } catch(erro){
      next(erro);
    }

  };

}

async function processaBusca(req){
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = req;
      
  const busca = {};

  if(editora) busca.editora = { $regex: editora, $options: "i"};
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"}; //Regex do MongoDB, 'i' para diferenciar maius. e minus.
  
  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas; //Nao sobreescreve quando receber os dois parametros
  // lte = Less Than or Equal = menor ou igual que
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(nomeAutor){
    const nomeRegex = {$regex: nomeAutor, $options: "i"};

    const autor = await autores.findOne({nome: nomeRegex});

    const autorId = autor._id;

    busca.autor = autorId;
  }

  return busca;
}



export default LivroController;