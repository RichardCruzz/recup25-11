import { formatarData } from '../util.js';

// cria cada item da lista na pagina de minhas inscricoes
export function ItemInscricao(evento) {
  const li = document.createElement('li');
  li.className = 'item-inscricao';

  li.innerHTML = `
    <h3>${evento.nome}</h3>
    <p><strong>data:</strong> ${formatarData(evento.data)}</p>
    <p><strong>local:</strong> ${evento.local}</p>
  `;

  return li;
}
