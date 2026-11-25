const API_URL = 'http://localhost:3000';

// busca os eventos cadastrados no back
export async function buscarEventos() {
  const resposta = await fetch(`${API_URL}/eventos`);

  if (!resposta.ok) {
    throw new Error('erro ao buscar eventos');
  }

  return resposta.json();
}

// manda as inscricoes do usuario para o back registrar
export async function enviarInscricoes(eventos) {
  const resposta = await fetch(`${API_URL}/inscricoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventos })
  });

  if (!resposta.ok) {
    throw new Error('erro ao enviar inscricoes');
  }

  return resposta.json();
}
