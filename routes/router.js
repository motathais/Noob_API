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




