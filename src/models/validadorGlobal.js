import mongoose from "mongoose";

//Definir uma propriedade para todo os campos do tipo String do modelos
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco`
}); 