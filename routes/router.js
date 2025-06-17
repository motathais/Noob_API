const router = require("express").Router()


//-------------------------------------------------------------------------------------------------------------------------------------

//Componentes

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - apelido
 *         - senha
 *       properties:
 *         apelido:
 *           type: string
 *           example: "maria"
 *         senha:
 *           type: string
 *           example: "senha@123"
 *
 *     LoginSuccessResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         usuario:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "6613f9bfb1246d27b072b8cd"
 *         msg:
 *           type: string
 *           example: "Usuário logado com sucesso!"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: "Algo deu errado!"
 * 
 *     UsuarioBase:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Maria Clara"
 *         apelido:
 *           type: string
 *           example: "maria123"
 *         nascimento:
 *           type: string
 *           format: date
 *           example: "1990-05-15"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria@email.com"
 *         nivel:
 *           type: integer
 *           example: 1
 *         foto:
 *           type: string
 *           format: uri
 *           example: "https://res.cloudinary.com/.../foto.jpg"
 *         capa:
 *           type: string
 *           format: uri
 *           example: "https://res.cloudinary.com/.../capa.jpg"
 *
 *     UsuarioResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UsuarioBase'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "6613f9bfb1246d27b072b8cd"
 *
 *     UsuarioCreateRequest:
 *       type: object
 *       required:
 *         - nome
 *         - apelido
 *         - nascimento
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         apelido:
 *           type: string
 *         nascimento:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *           format: email
 *         senha:
 *           type: string
 *         nivel:
 *           type: integer
 *           example: 1
 *       description: Enviar `foto` e `capa` como arquivos `multipart/form-data` separados.
 *
 *     UsuarioUpdateRequest:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         nascimento:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *           format: email
 *       description: Enviar `foto` e `capa` como arquivos `multipart/form-data` separados.
 *
 *     SenhaUpdateRequest:
 *       type: object
 *       required:
 *         - senha
 *       properties:
 *         senha:
 *           type: string
 *           example: "novaSenha@123"
 *
 *     UsuarioListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UsuarioResponse'
 *
 *     UsuarioDeletedResponse:
 *       type: object
 *       properties:
 *         deletedUsuario:
 *           $ref: '#/components/schemas/UsuarioResponse'
 *         msg:
 *           type: string
 *           example: "Usuário excluído com sucesso"
 * 
 *     JogoRequest:
 *       type: object
 *       required:
 *         - nome
 *         - ano
 *         - idade
 *         - designer
 *         - artista
 *         - editora
 *         - digital
 *         - categoria
 *         - componentes
 *         - descricao
 *       properties:
 *         nome:
 *           type: string
 *           example: "Catan"
 *         ano:
 *           type: integer
 *           example: 1995
 *         idade:
 *           type: string
 *           example: "10+"
 *         designer:
 *           type: string
 *           example: "Klaus Teuber"
 *         artista:
 *           type: string
 *           example: "Michael Menzel"
 *         editora:
 *           type: string
 *           example: "Devir"
 *         digital:
 *           type: boolean
 *           example: false
 *         categoria:
 *           type: string
 *           example: "Estratégia"
 *         componentes:
 *           type: string
 *           example: "Tabuleiro, cartas, peças"
 *         descricao:
 *           type: string
 *           example: "Jogo de construção de assentamentos e comércio."
 *         idOriginal:
 *           type: string
 *           example: "6613f9bfb1246d27b072b8cd"
 *         foto:
 *           type: string
 *           format: binary
 *         capa:
 *           type: string
 *           format: binary
 *     
 *     JogoResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nome:
 *           type: string
 *         ano:
 *           type: integer
 *         idade:
 *           type: string
 *         designer:
 *           type: string
 *         artista:
 *           type: string
 *         editora:
 *           type: string
 *         digital:
 *           type: boolean
 *         categoria:
 *           type: string
 *         componentes:
 *           type: string
 *         descricao:
 *           type: string
 *         idOriginal:
 *           type: string
 *         foto:
 *           type: string
 *         capa:
 *           type: string
 *         __v:
 *           type: integer
 *     
 *     MessageResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           example: "Mensagem de resposta"
 */


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
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login bem sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       400:
 *         description: Apelido ou senha não informados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *     summary: Lista todos os usuários cadastrados
 *     description: Retorna uma lista com todos os usuários cadastrados (exceto senhas).
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioListResponse'
 *       500:
 *         description: Erro ao buscar usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   post:
 *     summary: Criação de um novo usuário
 *     description: Cria um novo usuário com dados pessoais, senha e upload de imagem de perfil e capa.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - apelido
 *               - nascimento
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Maria Clara"
 *               apelido:
 *                 type: string
 *                 example: "maria123"
 *               nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@email.com"
 *               senha:
 *                 type: string
 *                 example: "senha@123"
 *               foto:
 *                 type: string
 *                 format: binary
 *               capa:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   $ref: '#/components/schemas/UsuarioResponse'
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso!"
 *       401:
 *         description: Email ou apelido já está em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
* @swagger
* /api/usuarios/{id}:
*   get:
*     summary: Buscar um usuário pelo ID
*     description: Retorna os dados de um usuário específico, com base no ID informado (exceto senha).
*     tags:
*       - Usuários
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID do usuário a ser consultado
*         schema:
*           type: string
*           example: "6613f9bfb1246d27b072b8cd"
*     responses:
*       200:
*         description: Usuário encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UsuarioResponse'
*       404:
*         description: Usuário não encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       500:
*         description: Erro ao buscar o usuário
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
* 
*   put:
*     summary: Atualiza os dados de um usuário
*     description: Atualiza as informações do usuário como nome, nascimento, email, foto e capa. Campos não enviados permanecem inalterados.
*     tags:
*       - Usuários
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID do usuário a ser atualizado
*         schema:
*           type: string
*           example: "6613f9bfb1246d27b072b8cd"
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               nome:
*                 type: string
*                 example: "Maria Clara Silva"
*               nascimento:
*                 type: string
*                 format: date
*                 example: "1990-05-15"
*               email:
*                 type: string
*                 format: email
*                 example: "novo@email.com"
*               foto:
*                 type: string
*                 format: binary
*               capa:
*                 type: string
*                 format: binary
*     responses:
*       200:
*         description: Usuário atualizado com sucesso
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedUsuario:
*                   $ref: '#/components/schemas/UsuarioResponse'
*                 msg:
*                   type: string
*                   example: "Usuário atualizado com sucesso!"
*       404:
*         description: Usuário não encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       500:
*         description: Erro na atualização
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
* 
*
*   delete:
*     summary: Deleta um usuário
*     description: Remove permanentemente um usuário com base no ID fornecido.
*     tags:
*       - Usuários
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: ID do usuário a ser excluído
*         schema:
*           type: string
*           example: "6613f9bfb1246d27b072b8cd"
*     responses:
*       200:
*         description: Usuário excluído com sucesso
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 deletedUsuario:
*                   $ref: '#/components/schemas/UsuarioResponse'
*                 msg:
*                   type: string
*                   example: "Usuário excluído com sucesso"
*       404:
*         description: Usuário não encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       500:
*         description: Erro no servidor
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*/

/**
 * @swagger
 * /api/usuarios/senha/{id}:
 *   put:
 *     summary: Atualiza a senha de um usuário
 *     description: Atualiza apenas a senha do usuário com base no ID informado.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário cuja senha será atualizada
 *         schema:
 *           type: string
 *           example: "6613f9bfb1246d27b072b8cd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senha
 *             properties:
 *               senha:
 *                 type: string
 *                 example: "novaSenha@456"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Senha atualizada com sucesso!"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/usuarios/preferencias/{id}:
 *   put:
 *     summary: Atualiza as preferências visuais do usuário
 *     description: Atualiza as preferências visuais (opção de fonte, tamanho da fonte e tema) do usuário com base no ID informado.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário cujas preferências serão atualizadas
 *         schema:
 *           type: string
 *           example: "6613f9bfb1246d27b072b8cd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fontOption
 *               - fontSize
 *               - theme
 *             properties:
 *               fontOption:
 *                 type: string
 *                 example: "Arial"
 *               fontSize:
 *                 type: string
 *                 example: "1"
 *               theme:
 *                 type: string
 *                 example: "dark"
 *     responses:
 *       200:
 *         description: Preferências atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Preferências atualizadas com sucesso!"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *     summary: Retorna todos os jogos cadastrados
 *     tags: [Jogos]
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JogoResponse'
 *       500:
 *         description: Erro ao buscar jogos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *
 *   post:
 *     summary: Cria um novo jogo
 *     tags: [Jogos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/JogoRequest'
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jogos:
 *                   $ref: '#/components/schemas/JogoResponse'
 *                 msg:
 *                   type: string
 *                   example: "Jogo criado com sucesso!"
 *       500:
 *         description: Erro ao criar o jogo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 * 
 */

/**
 * @swagger
 * /api/jogos/{id}:
 *   get:
 *     summary: Retorna um jogo pelo ID
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Jogo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JogoResponse'
 *       404:
 *         description: Jogo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 * 
 *   put:
 *     summary: Atualiza os dados de um jogo
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do jogo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/JogoRequest'
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jogo:
 *                   $ref: '#/components/schemas/JogoResponse'
 *                 msg:
 *                   type: string
 *                   example: "Jogo atualizado com sucesso!"
 *       404:
 *         description: Jogo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Erro ao atualizar o jogo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 * 
 *   delete:
 *     summary: Deleta um jogo pelo ID
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Jogo deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedJogo:
 *                   $ref: '#/components/schemas/JogoResponse'
 *                 msg:
 *                   type: string
 *                   example: "Jogo excluido com sucesso!"
 *       404:
 *         description: Jogo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
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
 *   post:
 *     summary: Cria uma nova partida
 *     tags: [Partidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarios
 *               - jogo
 *               - explicacao
 *               - inicio
 *               - registrador
 *             properties:
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *               jogo:
 *                 type: string
 *               explicacao:
 *                 type: string
 *               inicio:
 *                 type: string
 *                 format: date-time
 *               registrador:
 *                 type: string
 *     responses:
 *       201:
 *         description: Partida registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/Partida'
 *                 msg:
 *                   type: string
 *                   example: "Partida registrada com sucesso!"
 *       500:
 *         description: Erro interno
 *
 *   get:
 *     summary: Retorna todas as partidas
 *     tags: [Partidas]
 *     responses:
 *       200:
 *         description: Lista de partidas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 *       500:
 *         description: Erro interno
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
 *     summary: Atualiza os dados de uma partida (fim, vencedor e pontuação)
 *     tags: [Partidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da partida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fim:
 *                 type: string
 *                 format: date-time
 *               vencedor:
 *                 type: string
 *               pontuacao:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *     responses:
 *       200:
 *         description: Partida atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 partidaAtualizada:
 *                   $ref: '#/components/schemas/Partida'
 *                 msg:
 *                   type: string
 *                   example: "Partida atualizada com sucesso!"
 *       400:
 *         description: Data de fim inválida
 *       404:
 *         description: Partida não encontrada
 *       500:
 *         description: Erro ao atualizar
 *
 *   delete:
 *     summary: Exclui uma partida
 *     tags: [Partidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da partida
 *     responses:
 *       200:
 *         description: Partida excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedPartida:
 *                   $ref: '#/components/schemas/Partida'
 *                 msg:
 *                   type: string
 *                   example: "Partida excluida com sucesso!"
 *       404:
 *         description: Partida não encontrada
 */

/**
 * @swagger
 * /api/partidas/fitro:
 *   get:
 *     summary: Filtra partidas por registrador e status de fim
 *     tags: [Partidas]
 *     parameters:
 *       - in: query
 *         name: registrador
 *         schema:
 *           type: string
 *         description: ID do usuário registrador
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *         description: Valor do campo "fim" (use "null" para buscar partidas em andamento)
 *     responses:
 *       200:
 *         description: Lista de partidas filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 *       404:
 *         description: Nenhuma partida encontrada com os critérios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Erro ao buscar partidas
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
 *             required:
 *               - usuario
 *               - jogo
 *               - beleza
 *               - divertimento
 *               - duracao
 *               - preco
 *               - armazenamento
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "6613f1a7bcf8a4f2f6dd1523"
 *               jogo:
 *                 type: string
 *                 example: "6613f1a7bcf8a4f2f6dd1524"
 *               beleza:
 *                 type: number
 *                 example: 4
 *               divertimento:
 *                 type: number
 *                 example: 5
 *               duracao:
 *                 type: number
 *                 example: 3
 *               preco:
 *                 type: number
 *                 example: 4
 *               armazenamento:
 *                 type: number
 *                 example: 3
 *     responses:
 *       201:
 *         description: Avaliação registrada com sucesso!
 *       500:
 *         description: Erro ao criar avaliação
 *
 *   get:
 *     summary: Lista todas as avaliações
 *     description: Retorna todas as avaliações cadastradas.
 *     tags:
 *       - Avaliações
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *       500:
 *         description: Erro ao buscar avaliações
 */

/**
 * @swagger
 * /api/avaliacoes/{id}:
 *   get:
 *     summary: Retorna uma avaliação específica
 *     description: Busca uma avaliação pelo ID fornecido.
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao buscar avaliação
 *
 *   put:
 *     summary: Atualiza uma avaliação
 *     description: Atualiza os dados de uma avaliação existente.
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - jogo
 *               - beleza
 *               - divertimento
 *               - duracao
 *               - preco
 *               - armazenamento
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "6613f1a7bcf8a4f2f6dd1523"
 *               jogo:
 *                 type: string
 *                 example: "6613f1a7bcf8a4f2f6dd1524"
 *               beleza:
 *                 type: number
 *                 example: 4
 *               divertimento:
 *                 type: number
 *                 example: 5
 *               duracao:
 *                 type: number
 *                 example: 3
 *               preco:
 *                 type: number
 *                 example: 4
 *               armazenamento:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao atualizar avaliação
 *
 *   delete:
 *     summary: Remove uma avaliação
 *     description: Deleta uma avaliação existente pelo ID.
 *     tags:
 *       - Avaliações
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao deletar avaliação
 */

//--------------------------------------------------------------------------------------------------------------------------------------

// FEEDBACKS: 

const feedbacksRouter = require("./feedbacks");

router.use("/", feedbacksRouter);

//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;




