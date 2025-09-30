const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use("/usuario", usuarioRoutes);

app.listen(5015, () => {
  console.log("Aplicação rodando na porta 5015...");
});
