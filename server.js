/*============================================================
    1ª Parte - Configurar o servidor
  ============================================================
*/

// 1. Importar o Express - ele cria e gerencia o servidor
const express = require("express");

// 2. Importar o CORS 
const cors = require("cors");

// 3. Importa o Session - permite gerenciar sessões de usuário
const session = require("express-session");

// 4. Importa o bcryptjs - critptografia e comparação de senhas
const bcryptjs = require("bcryptjs");

 // 5. Importa a conexão com o banco de dados
 const pool = require("./db.js ")

// 6. Cria o servidor (como ligar um pc por ex)
const app = express();

// 7. Cria uma lista de instância de conexões
const listOrigins = [
  "http://localhost:3000", //ambientação local (live server)
  "http://127.0.0.1:5500", //variação de localhost
  "http://user.github.io" // domínio do frontend em produção
]

// 8. Front-end e Back-end se comunicam através do cors
app.use(cors({
  origin: listOrigins, //aceita requesições dessas origens
  credentials: true, //permite o envio de cookies entre domínios
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 9. Ativa o leitor de JSON - permite entender os dados recebidos
app.use(express.json());

// 10. Configuração de Sessão (do navegador)
const sessionConfig = {
  secret: process.env.SESSION_SECRET, //chave para assinar o cookie do navegador
  resave: false, //não salva a sessão se não houver mudança
  saveUninitialized: false,
  name: "techeduca.sid",
  cookie: {
    httpOnly: true, //bloqueia o acesso via JavaScript
    maxAge: 1000 * 60 * 60 //sessão expira em 1h
  }
}

// 11. Separa o ambienete de teste(localhost) do de produção(Render)ased
if(process.env.NODE_ENV == "production"){ //ambiente de produção
  app.set("trust proxy", 1) //confia no proxy do render
  sessionConfig.cookie.sameSite = "none",
  sessionConfig.cookie.security = true //cookie só trafega em https
} 

else{ //ambiente de desenvolvimento
  sessionConfig.cookie.sameSite = "lax" //funciona apenas em localhost e sem https
  sessionConfig.cookie.security = false
}

app.use(session(sessionConfig)) //configura a sessão no servidor

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