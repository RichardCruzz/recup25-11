// barra de menu fixa no topo das paginas
export function Menu(rotaAtual) {
  const header = document.createElement('header');
  header.className = 'topo';

  header.innerHTML = `
    <div class="container topo-conteudo">
      <a href="#/" class="logo">sistema de eventos</a>
      <nav class="menu">
        <a href="#/" class="${rotaAtual === '/' ? 'ativo' : ''}">eventos</a>
        <a href="#/inscricoes" class="${rotaAtual === '/inscricoes' ? 'ativo' : ''}">minhas inscrições</a>
      </nav>
    </div>
  `;

  return header;
}
