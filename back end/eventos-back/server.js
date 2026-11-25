const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const porta = 3000;
const caminhoDb = path.join(__dirname, 'db.json');

// libera o front pra conseguir acessar a api
app.use(cors());

// permite ler o json que vem nas requisicoes
app.use(express.json());

// deixa a pasta de imagens acessivel pro front carregar nos cards
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

// le o arquivo db.json
function lerBanco() {
  const arquivo = fs.readFileSync(caminhoDb, 'utf-8');
  return JSON.parse(arquivo);
}

// salva os dados atualizados no db.json
function salvarBanco(dados) {
  fs.writeFileSync(caminhoDb, JSON.stringify(dados, null, 2), 'utf-8');
}

// retorna a lista de eventos ja com o link completo da imagem
app.get('/eventos', (req, res) => {
  const banco = lerBanco();

  const lista = banco.eventos.map((evento) => ({
    ...evento,
    imagem: `http://localhost:${porta}${evento.imagem}`
  }));

  res.json(lista);
});

// recebe as inscricoes enviadas pelo front e salva no db.json
app.post('/inscricoes', (req, res) => {
  const eventos = req.body.eventos;

  if (!eventos || eventos.length === 0) {
    return res.status(400).json({ mensagem: 'nenhum evento enviado.' });
  }

  const banco = lerBanco();

  const novaInscricao = {
    id: Date.now(),
    dataRegistro: new Date().toLocaleDateString('pt-BR'),
    quantidade: eventos.length,
    eventos: eventos
  };

  banco.inscricoes.push(novaInscricao);
  salvarBanco(banco);

  res.status(201).json({
    mensagem: 'inscrições salvas com sucesso.',
    registro: novaInscricao
  });
});

app.listen(porta, () => {
  console.log(`servidor rodando em http://localhost:${porta}`);
});
