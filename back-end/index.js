const express = require("express");

const app = express();



app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.listen(5000, (err) => {
    console.log("Aplicação rodando na porta 5000...");
});
