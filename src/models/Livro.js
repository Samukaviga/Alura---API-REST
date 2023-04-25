import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";


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
      required: [true, "O autor(a) é obrigatório."],
      autopopulate: { select: "nome"}
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
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O numero de páginas deve ser entre 10 e 5000." 
      }
    } 
  }
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema); //linha na qual o modelo é criado

export default livros; 