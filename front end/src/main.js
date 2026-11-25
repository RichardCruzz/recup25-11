import './style.css';
import { Menu } from './componentes/Menu.js';
import { Home } from './paginas/Home.js';
import { MinhasInscricoes } from './paginas/MinhasInscricoes.js';

const app = document.querySelector('#app');

// pega qual rota esta aberta na url depois do #
function pegarRota() {
  return window.location.hash.replace('#', '') || '/';
}

// troca a tela sem recarregar a pagina inteira
async function carregarPagina() {
  const rota = pegarRota();
  app.innerHTML = '';

  app.appendChild(Menu(rota));

  const main = document.createElement('main');
  app.appendChild(main);

  if (rota === '/inscricoes') {
    main.appendChild(MinhasInscricoes());
  } else {
    main.appendChild(await Home());
  }
}

// escuta quando o usuario muda de pagina pelo menu
window.addEventListener('hashchange', carregarPagina);
carregarPagina();
