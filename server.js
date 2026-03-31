/*============================================================
    1ª Parte - Configurar o servidor
  ============================================================
*/

// 1. Importar o Express - ele cria e gerencia o servidor
const express = require("express");

// 2. Importar o CORS - permite que ele "converse" com o servidor
const cors = require("cors");

// 3. Cria o servidor (como ligar um pc por ex)
const app = express();

// 4. Front-end e Back-end se comunicam através do cors
app.use(cors());

// 5. Ativa o leitor de JSON - permite entender os dados recebidos
app.use(express.json());

/*============================================================
    2ª Parte - Criar rota e inicar
  ============================================================
*/

// 6. Define a rota POST "/mensagem"
// Quando o formulário enviar os dados para /mensagem, essa função
app.post("/mensagem", (req, res) => {
  
  // 7. Req.body, contém os dados enviados pelo formulário
  console.log (req.body); // mostra os dados no terminal

  //8. envia uma mensagem de volta para o navegador
  res.send("Mensagem recebida com sucesso!")
});

// 9. Inicia o servidor porta :3000
// Depois, o servidor espera por novas mensagem
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});0