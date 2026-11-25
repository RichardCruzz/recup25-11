const CHAVE = 'inscricoes';

// busca a lista de eventos que foi salva no navegador
export function pegarInscricoes() {
  return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

// checa se o usuario ja clicou pra se inscrever nesse evento
export function estaInscrito(id) {
  const lista = pegarInscricoes();
  return lista.some((item) => item.id === id);
}

// adiciona o evento no localstorage sem deixar repetir
export function adicionarInscricao(evento) {
  const lista = pegarInscricoes();

  if (!estaInscrito(evento.id)) {
    lista.push(evento);
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  }
}

// apaga a lista do navegador depois que confirma no back
export function limparInscricoes() {
  localStorage.removeItem(CHAVE);
}
