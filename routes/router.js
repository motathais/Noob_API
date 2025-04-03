const router = require("express").Router()

//--------------------------------------------------------------------------------------------------------------------------------------

// LOGIN 

// Router:

const loginRouter = require("./login");

router.use("/", loginRouter);

// Swagger:
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autenticação do usuário
 *     description: Valida as credenciais do usuário e retorna um token de autenticação para acesso aos endpoints protegidos.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apelido:
 *                 type: string  # <-- Corrigido: string minúsculo
 *                 example: "maria"
 *               senha:
 *                 type: string  # <-- Corrigido: string minúsculo
 *                 example: "senha@123"
 *     responses:
 *       200:
 *         description: Login bem sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 mensagem:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *       400:
 *         description: Apelido ou senha não informados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Por favor, preencha as informações para login!"
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Nome de usuário ou senha inválido!"
 *       404:
 *         description: Usuário não existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Nome de usuário ou senha inválido!"  
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro interno no servidor. Tente novamente mais tarde."
 */


//---------------------------------------------------------------------------------------------------------------------------------------

// USUARIOS:

// Router:

const usuariosRouter = require("./usuarios");

router.use("/", usuariosRouter);

// Swagger:

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna todos os usuários 
 *     description: Retorna os dados de todos os usuários cadastrados.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 *
 *   post:
 *     summary: Adiciona um novo usuário
 *     description: Cria um novo usuário a partir dos dados enviados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Serviço excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso!
 *
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     description: Retorna os dados de um usuário de ID específico
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 * 
 *   put:
 *     summary: Atualiza um usuário existente
 *     description: Modifica os dados de um usuário de ID específico.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 *   delete:
 *     summary: Remove um usuário
 *     description: Exclui um usuário pelo ID.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será removida
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso!
 */

/**
 * @swagger
 * /api/usuarios/senha/{id}:
 *   put:
 *     summary: Atualiza a senha do usuário
 *     description: Modifica a senha de um usuário de ID específico.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 */


//--------------------------------------------------------------------------------------------------------------------------------------

// JOGOS: 

// Router:

const jogosRouter = require("./jogos");

router.use("/", jogosRouter);

// Swagger:

/**
 * @swagger
 * /api/jogos:
 *   get:
 *     summary: Retorna todas os jogos 
 *     description: Retorna os dados de todos os jogos cadastrados.
 *     tags:
 *       - Jogos
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 *
 *   post:
 *     summary: Adiciona um novo jogo
 *     description: Cria um novo jogo a partir dos dados enviados.
 *     tags:
 *       - Jogos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Serviço excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso!
 *
 */

/**
 * @swagger
 * /api/jogos/{id}:
 *   get:
 *     summary: Retorna um jogo específico
 *     description: Retorna os dados de um jogo de ID específico.
 *     tags:
 *       - Jogos
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 * 
 *   put:
 *     summary: Atualiza um jogo existente
 *     description: Modifica os dados de um jogo de ID específico.
 *     tags:
 *       - Jogos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 *   delete:
 *     summary: Remove um jogo
 *     description: Exclui um jogo pelo ID.
 *     tags:
 *       - Jogos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será removida
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso!
 */


//--------------------------------------------------------------------------------------------------------------------------------------

// PARTIDAS: 

// Router:

const partidasRouter = require("./partidas");

router.use("/", partidasRouter);

// Swagger:

/**
 * @swagger
 * /api/partidas:
 *   get:
 *     summary: Retorna todas as partidas
 *     description: Retorna os dados de todas as partidas cadastradas.
 *     tags:
 *       - Partidas
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 *
 *   post:
 *     summary: Adiciona uma nova partida
 *     description: Cria um nova partida a partir dos dados enviados.
 *     tags:
 *       - Partidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Serviço excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso!
 *
 */

/**
 * @swagger
 * /api/partidas/{id}:
 *   get:
 *     summary: Retorna partida específica
 *     description: Retorna os dados de uma partida de ID específico.
 *     tags:
 *       - Partidas
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 * 
 *   put:
 *     summary: Atualiza uma partida existente
 *     description: Modifica os dados de uma partida de ID específico.
 *     tags:
 *       - Partidas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 *   delete:
 *     summary: Remove uma partida
 *     description: Exclui uma partida pelo ID.
 *     tags:
 *       - Partidas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será removida
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso!
 */


//--------------------------------------------------------------------------------------------------------------------------------------

// DENUNCIAS:

// Router:

const denunciasRouter = require("./denuncias");

router.use("/", denunciasRouter);

// Swagger:

/**
 * @swagger
 * /api/denuncias:
 *   get:
 *     summary: Retorna todas as denúncias
 *     description: Retorna os dados de todas as denúncias cadastradas.
 *     tags:
 *       - Denúncias
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 *
 *   post:
 *     summary: Adiciona uma nova denúncia
 *     description: Cria um nova denúncia a partir dos dados enviados.
 *     tags:
 *       - Denúncias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Serviço excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso!
 *
 */

/**
 * @swagger
 * /api/denuncias/{id}:
 *   get:
 *     summary: Retorna uma denúncia específica
 *     description: Retorna os dados de uma partida de ID específico.
 *     tags:
 *       - Denúncias
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 * 
 *   put:
 *     summary: Atualiza uma denúncia existente
 *     description: Modifica os dados de uma denúncia de ID específico.
 *     tags:
 *       - Denúncias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 *   delete:
 *     summary: Remove uma denúncia
 *     description: Exclui uma denúncia pelo ID.
 *     tags:
 *       - Denúncias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será removida
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso!
 */


//--------------------------------------------------------------------------------------------------------------------------------------

// AVALIACOES: 

// Router:

const avaliacoesRouter = require("./avaliacoes");

router.use("/", avaliacoesRouter);

// Swagger:

/**
 * @swagger
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna os dados de todas as avaliações cadastradas.
 *     tags:
 *       - Avaliações
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 *
 *   post:
 *     summary: Adiciona uma nova avaliação
 *     description: Cria uma nova avaliação a partir dos dados enviados.
 *     tags:
 *       - Avaliações
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Serviço excelente!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso!
 *
 */

/**
 * @swagger
 * /api/avaliacoes/{id}:
 *   get:
 *     summary: Retorna uma avaliação específica
 *     description: Retorna os dados de uma avaliação de ID específico.
 *     tags:
 *       - Avaliações
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   nota:
 *                     type: integer
 *                     example: 5
 *                   comentario:
 *                     type: string
 *                     example: "Ótima experiência!"
 * 
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     description: Modifica os dados de uma avaliação de ID específico.
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Atendimento bom, mas pode melhorar!"
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso!
 *
 *   delete:
 *     summary: Remove uma avaliação
 *     description: Exclui uma avaliação pelo ID.
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da avaliação que será removida
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso!
 */

//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;




