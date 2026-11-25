import { formatarData } from '../util.js';
import { estaInscrito, adicionarInscricao } from '../storage.js';

// cria o card de cada evento com imagem, dados e botao de inscricao
export function CardEvento(evento) {
  const jaInscrito = estaInscrito(evento.id);

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${evento.imagem}" alt="${evento.nome}" />
    <div class="card-conteudo">
      <h2>${evento.nome}</h2>
      <p><strong>data:</strong> ${formatarData(evento.data)}</p>
      <p><strong>local:</strong> ${evento.local}</p>
      <button type="button" class="botao" ${jaInscrito ? 'disabled' : ''}>
        ${jaInscrito ? 'inscrito' : 'inscrever-se'}
      </button>
    </div>
  `;

  const botao = card.querySelector('button');

  // salva no navegador e trava o botao quando clicar
  botao.addEventListener('click', () => {
    adicionarInscricao(evento);
    botao.textContent = 'inscrito';
    botao.disabled = true;
  });

  return card;
}
