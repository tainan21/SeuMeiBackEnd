  // backend/index.js
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');

  // Conectar ao MongoDB (conexão local ou remota)
  mongoose.connect('mongodb+srv://seumeitai:seumeisenha@clustermei.gbkpfgh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMei', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  app.use(cors()); // Permitir acesso do frontend
  app.use(express.json()); // Para parsear JSON

  // Criar o esquema e o modelo para clientes
  const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    endereco: { type: String, required: true },
  });

  const Cliente = mongoose.model('Cliente', clienteSchema);

  // Rota para obter todos os clientes
  app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
  });

  // Rota para adicionar um novo cliente
  app.post('/clientes', async (req, res) => {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.json(novoCliente);
  });

  const port = 3001;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
