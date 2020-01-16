const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routers");

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://localhost/omnistack', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao mongo com sucesso!');
}).catch((erro) => {
    console.log('Ocorreu um erro ao se conectar com o mongodb: ' + erro);
});

app.listen(3333);