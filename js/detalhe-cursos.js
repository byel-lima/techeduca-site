// Captura os elementos da página detalhes do curso
const conteudoCurso = document.querySelector("#conteudoCurso")
const mensagemCarregamento = document.querySelector("#mensagemCarregamento")

// Lê o identificador enviado na URL
const parametros = new URLSearchParams(window.location.search);
const idCurso = Number(parametros.get("id"));

// Função que carrega o curso
async function carregarDetalhesCurso(){
    try{
        const resposta = await fetch("../data/cursos.json");
       
        if(!resposta){
            console.error("Não foi possível carregar os cursos");
            mensagemCarregamento.textContent=
                "Não foi possível carregar os cursos";
        };

        const cursos = await resposta.json();

        const cursoEncontrado = cursos.find(
            curso => curso.id === idCurso
        );

        if(!cursoEncontrado){
            mostrarCursoNaoEncontrado();
            return;
        };

        mostrarCurso(cursoEncontrado);

    } catch(erro){
       console.error("Erro ao carregar curso ",erro);
       mensagemCarregamento.textContent =
            "Não foi possível carregar as informações do curso";
    }
}


function mostrarCurso(curso){
    mensagemCarregamento.textContent = "";

    conteudoCurso.innerHTML = `
        <h3> ${curso.titulo} </h3>
        <img src="${curso.img}" width="150" height="150">
        <p> ${curso.descricao} </p>
        <p> <strong>CH: </strong> ${curso.ch}</p>
        <p> <strong>Nivel: </strong> ${curso.nivel}</p>
        <p> <strong>Modalidade: </strong> ${curso.modalidade}</p>
        <p> <strong>Objetivo: </strong> ${curso.objetivo}</p>
        <p> <strong>Público: </strong> ${curso.publico}</p>
        <p> <strong>Conteúdo: </strong> ${curso.conteudo}</p>    
    `;
}

function mostrarCursoNaoEncontrado(){
     mensagemCarregamento.textContent = "";

     conteudoCurso.innerHTML = `
        <div class="detalhe-curso">
          <h1> Curso não encontrado!</h1>
          <p> O curso não existe ou não está disponível </p>
        </div>
     `
}


// Iniciar carregamento
carregarDetalhesCurso();