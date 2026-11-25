import { buscarEventos } from '../api.js';
import { CardEvento } from '../componentes/CardEvento.js';

// pagina inicial que lista os eventos vindos da api
export async function Home() {
  const section = document.createElement('section');
  section.className = 'container pagina';

  section.innerHTML = `
    <h1>eventos disponíveis</h1>
    <div id="lista-eventos" class="lista-cards">
      <p>carregando eventos...</p>
    </div>
  `;

  const areaCards = section.querySelector('#lista-eventos');

  try {
    const eventos = await buscarEventos();
    areaCards.innerHTML = '';

    // monta um card pra cada evento que veio do back
    eventos.forEach((evento) => {
      areaCards.appendChild(CardEvento(evento));
    });
  } catch (erro) {
    areaCards.innerHTML = '<p>não foi possível carregar os eventos. veja se o back-end está ligado.</p>';
  }

  return section;
}
