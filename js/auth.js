const formCadastro = document.getElementById("formCadastro"); //pega o id colocado dentro da tag html
const formLogin = document.getElementById("formLogin"); //mesma coisa

//url da api local
const API_URL = "http://localhost:3000";
// const API_URL = "url_render";

if(formCadastro){
    formCadastro.addEventListener("submit", async function(event){
        event.preventDefault(); //previne que a página recarregue

        //captura cada campo do form
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confSenha = document.getElementById("confSenha").value;
        const mensagemCadastro = document.getElementById("mensagemCadastro");
        mensagemCadastro.textContent = ""; //limpa mensagem anterior

        //campo vazio = interromper

        if(!nome || !email || !senha || !confSenha){
            mensagemCadastro.textContent = "Preencha todos os campos corretamente!";
            return
        };

        //campo diferente = interromper

        if(senha !== confSenha){
            mensagemCadastro.textContent = "As senhas não coincidem!";
            return
        };

        //envio para o backend e resposta para o frontend
        try{
            const resposta = await fetch(`${API_URL}/cadastro`, 
            {method: "POST", //tipo de requisição: "enviando"
            headers: {"Content-Type": "application/json"}, //tipo de arquivo enviado, json
            body: JSON.stringify({nome,email,senha}) //converte o objeto js em json e coloca no corpo da msg
            });

            //lê a mensagem da maneira correta
            const dados = resposta.JSON();

            //exibe a mensagem de erro ou acesso
            mensagemCadastro.textContent = dados.mensagemCadastro || dados.error;

            //sucesso -> limpa o formulário
            formCadastro.reset();
        }

        catch{
            //servidor offline ou inacessível
            mensagemCadastro.textContent = "Error ao se conectar com o servidor"
        }
    });
}

if(formLogin){
    formLogin.addEventListener("submit", async function(event){
        event.preventDefault(); //previne que a página recarregue

        //captura cada campo do form
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const mensagemLogin = document.getElementById("mensagemLogin");
        mensagemLogin.textContent = ""; //limpa mensagem anterior

        //campo vazio = interromper
        if(!email || !senha){
            mensagemLogin.textContent = "Preencha todos os campos corretamente!";
            return
        };

        //envio para o backend e resposta para o frontend
        try{
            const resposta = await fetch(`${API_URL}/login`, 
            {method: "POST", //tipo de requisição: "enviando"
            headers: {"Content-Type": "application/json"}, //tipo de arquivo enviado, json
            credentials: "include", //necessário para o cookie da sessão funcionar
            body: JSON.stringify({email,senha}) //converte o objeto js em json e coloca no corpo da msg
            });

            //lê a mensagem da maneira correta
            const dados = resposta.JSON();

            //exibe a mensagem de erro ou acesso
            mensagemLogin.textContent = dados.mensagemLogin || dados.error;

            //sucesso -> redireciona para os cursos
            if(resposta.ok){
                window.location.href = "../pages/cursos.html"
          }
        }

        catch{
            //servidor offline ou inacessível
            mensagemLogin.textContent = "Error ao se conectar com o servidor"
        }
    });
}