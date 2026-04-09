/*============================================================
    1ª Parte - Configurar o servidor
  ============================================================
*/

// Importar as credenciais do banco
require("dotenv").config(0);

// 1. Importar o Express - ele cria e gerencia o servidor
const express = require("express");

// 2. Importar o CORS 
const cors = require("cors");

// 3. Importa o Session - permite gerenciar sessões de usuário
const session = require("express-session");

// 4. Importa o bcryptjs - critptografia e comparação de senhas
const bcryptjs = require("bcryptjs");

 // 5. Importa a conexão com o banco de dados
 const pool = require("./db")

// 6. Cria o servidor (como ligar um pc por ex)
const app = express();

// 7. Cria uma lista de instância de conexões
const listOrigins = [
  "http://localhost:3000", //ambientação local (live server)
  "http://127.0.0.1:5500", //variação de localhost
  "http://user.github.io" // domínio do frontend em produção
];

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
};

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

app.use(session(sessionConfig)); //configura a sessão no servidor

/*============================================================
    2ª Parte - Criar rota e inicar
  ============================================================
*/

// 1. Define a rota POST "/mensagem"
// Quando o formulário enviar os dados para /mensagem, essa função roda
app.post("/mensagem", (req, res) => {
  
  // 2. Req.body, contém os dados enviados pelo formulário
  console.log (req.body); // mostra os dados no terminal

  // 3. envia uma mensagem de volta para o navegador
  res.send("Mensagem recebida com sucesso!")
});

// 4. Define a rota POST "/cadastro"
// Quando o formulário enviar os dados para /cadastro, essa função roda
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const [rows] = await pool.execute(
      "SELECT id FROM tb_usuarios WHERE email=?", [email]
    );

    if (rows.length > 0) { // Corrigido de lenght para length
      return res.status(409).json({ error: "Email já cadastrado!" });
    }

    // Use bcryptjs conforme importado no item 4 do seu código
    const senhaHash = await bcryptjs.hash(senha, 10); 

    // Correção na execução do INSERT (um único array de parâmetros)
    await pool.execute(
      "INSERT INTO tb_usuarios(nome, email, senha) VALUES(?, ?, ?)",
      [nome, email, senhaHash]
    );

    res.status(201).json({ sucesso: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário!" });
  }
});

// 5. Define a rota POST "/login"
// Quando o formulário enviar os dados para /cadastro, essa função roda
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const [rows] = await pool.execute(
      "SELECT id, nome, email, senha FROM tb_usuarios WHERE email=?", [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado!" });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcryptjs.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha Inválida!" });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    // Corrigido: adicionado .json() antes do parêntese
    res.status(200).json({ sucesso: "Login realizado com sucesso!" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login!" });
  }
});

// 5. Define a rota post "/logout" - encerrar sessão
app.get("/me", (req, res) => {
  if(!req.session.usuario){
    return res.status(401).json({logado: false})
  }

  res.json({
    logado: true, //confirma que está logado
    usuario: req.session.usuario}) //devolve os dados do usuário (nome, email, id)
});

app.post ("/logout", (req, res) => {
  req.session.destroy(() => {    
    res.clearCookie("techeduca.sid");
    res.json({sucesso: "Logout realizado!"})
  });
});

// 6. Inicia o servidor porta :3000
// Depois, o servidor espera por novas mensagem
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});0