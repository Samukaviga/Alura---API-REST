import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    titulo: {
      type: String, 
      required: [true, "O nome do livro é obrigatório."]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O autor(a) é obrigatório."]
    },
    editora: {
      type: String, 
      required: [true, "O nome da editora é obrigatório."],
      enum: {   
        values: ["Suma de letras", "ingles"],  //Editoras obrigatórias e unicas para STRINGs
        message: "A editora {VALUE} não é um nome válido."
      }
    },
    numeroPaginas: {
      type: Number, 
      min: [10, "O numero de paginas deve estar entre 10 e 5000."], 
      max: [5000, "O numero de paginas deve estar entre 10 e 5000"]
    } 
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros; 