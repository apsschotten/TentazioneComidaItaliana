import { listen } from "./app";

const PORT = 3000;

listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}.`);
});