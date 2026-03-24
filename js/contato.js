/*============================================================
    1) PEGAR A TAG DO FORM PELO ID / CAPTURAR OS DADOS DO FORM NO HTML
  ============================================================
*/
const form = document.getElementById("formContato");
//Document enxerga os coiso do html
 
/*============================================================
    2) Fica "ouvindo" o momento que o usuario clica no botao enviar /TRATAR E ENVIAR OS DADOS PARA O SERVIDOR
  ============================================================
*/
form.addEventListener("submit", async function(event){

    //3) impede que a pagina recarregue (comportamento padrão do form)
    event.preventDefault();
 
    // 4) ler o que o usuario digitou em cada campo
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
 
    // 5). Agrupa os dados em um objeto (como uma caixinha organizada)
    const caixinha = {nome,email,mensagem}; // objeto
 
    try{
    // 6). envia os dados para o servidor usando fetch()
     const resposta = await fetch("http://localhost:3000/mensagem",{
        "method": "POST", // POST = estamos enviando os dados
        "headers": {
            "Content-Type": "aplication/json" //avisa que o formato e JSON
        },
        body: JSON.stringify(caixinha) // converte o objeto para texto JSON
 
     })

     // 7.
     const dados = await resposta.text();

     // 8.
     alert(dados);

    // 9. 
     form.reset();
 
 
    }catch(erro){
        // 10). se der erro servidor offiline, por exemplo)
        alert(`Erro: ${erro}`);
    }
 
})