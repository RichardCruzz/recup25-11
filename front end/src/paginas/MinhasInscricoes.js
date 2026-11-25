import { enviarInscricoes } from '../api.js';
import { pegarInscricoes, limparInscricoes } from '../storage.js';
import { ItemInscricao } from '../componentes/ItemInscricao.js';

// pagina que mostra o que esta salvo no navegador e envia pro back ao confirmar
export function MinhasInscricoes() {
  const section = document.createElement('section');
  section.className = 'container pagina';

  function montarTela() {
    const inscricoes = pegarInscricoes();
    section.innerHTML = '';

    const titulo = document.createElement('h1');
    titulo.textContent = 'minhas inscrições';
    section.appendChild(titulo);

    const resumo = document.createElement('div');
    resumo.className = 'resumo';
    resumo.innerHTML = `
      <p>total de inscrições: <strong>${inscricoes.length}</strong></p>
      <button type="button" id="btn-confirmar" class="botao" ${inscricoes.length === 0 ? 'disabled' : ''}>
        confirmar inscrições
      </button>
    `;
    section.appendChild(resumo);

    if (inscricoes.length === 0) {
      const aviso = document.createElement('p');
      aviso.textContent = 'nenhuma inscrição realizada até o momento.';
      section.appendChild(aviso);
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'lista-inscricoes';

    inscricoes.forEach((evento) => {
      ul.appendChild(ItemInscricao(evento));
    });

    section.appendChild(ul);

    const botaoConfirmar = section.querySelector('#btn-confirmar');

    // envia os eventos para o servidor e limpa o storage se der certo
    botaoConfirmar.addEventListener('click', async () => {
      botaoConfirmar.disabled = true;
      botaoConfirmar.textContent = 'enviando...';

      try {
        await enviarInscricoes(inscricoes);
        limparInscricoes();
        alert('inscrições confirmadas e registradas com sucesso!');
        montarTela();
      } catch (erro) {
        alert('erro ao confirmar inscrições. veja se o servidor está rodando.');
        botaoConfirmar.disabled = false;
        botaoConfirmar.textContent = 'confirmar inscrições';
      }
    });
  }

  montarTela();
  return section;
}
