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

        <div class="infoBox">
            <p> <strong>CH: </strong> </p>
            <p> ${curso.ch} </p>
        </div>

        <div class="infoBox">
            <p> <strong>Nivel: </strong> </p>
            <p> ${curso.nivel} </p>
        </div>

        <div class="secaoDetalhe"> 
            <p class="infoLabel"> <strong>Modalidade: </strong> </p> 
            <p class="infoValor"> ${curso.modalidade} </p>
        </div>

        <div class="secaoDetalhe"> 
            <p class="infoLabel"> <strong>Objetivo: </strong> </p> 
            <p class="infoValor"> ${curso.objetivo} </p> 
        </div>

        <div class="secaoDetalhe"> 
            <p class="infoLabel"> <strong>Público: </strong> </p>
            <p class="infoValor"> ${curso.publico} </p>
        </div>

        <div class="secaoDetalhe"> 
            <p class="infoLabel"> <strong>Conteúdo: </strong> </p>
            <p class="infoValor"> ${curso.conteudo} </p>
        </div>

        <button href="../pages/cursos> Voltar para cursos </button>
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