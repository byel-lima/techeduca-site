/*============================================================
    1) PEGAR OS ELEMENTOS DO HTML
  ============================================================
*/
const ListaCursos = document.querySelector("#ListaCursos");
const buscaCursos = document.querySelector("#BuscarCursos")

/*============================================================
    2)CRIAR UMA LISTA PARA GUARDAR OS CURSOS
  ============================================================
*/
let cursos = [];

/*============================================================
    3) FUNÇÃO PARA CARREGAR O JSON
  ============================================================
*/
async function carregarCursos(){
    //BUSCA O ARQUIVO cursos.json
    const resposta = await fetch("../data/cursos.json");
    console.log(resposta);

    //TRANSFORMA O JSON EM DADOS QUE O JS ENTENDE
    const cursos = await resposta.json;

    //depois de caregar, já renderiza na tela
    renderizarCursos(cursos);
};

/*============================================================
    4) FUNÇÃO PARA CRIAR OS CARDS NA TELA
  ============================================================
*/
function renderizarCursos(lista){
    //limpa o conteúdo da tela antes de desenhar de novo
    ListaCursos.innerHTML = "";

    //para cada card 'curso' da lista, cria um card
    lista.forEach(curso => {
      const card = document.createElement("div");
      card.classList.add("card-curso");
      card.innerHTML = 
      `
        <h3> ${curso.titulo} </h3>
        <img src ="${curso.img} width="50" height="50"">
        <p> ${curso.descricao} </p>
        <p> <strong>CH: </strong> ${curso.ch}</p>
        <a href="${curso.url}"<button>Ver detalhes</button></a>
      `;
      ListaCursos.appendChild(card);      
    });
}

/*============================================================
    6) INICIA TUDO
  ============================================================
*/
carregarCursos();