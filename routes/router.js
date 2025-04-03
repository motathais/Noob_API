const router = require("express").Router()
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
 *     summary: Retorna todas as avaliações
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     summary: Adiciona uma nova avaliação
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     summary: Atualiza uma avaliação existente
 *     description: Modifica os dados de uma avaliação específica.
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
 *     summary: Remove uma avaliação
 *     description: Exclui uma avaliação pelo ID.
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


//--------------------------------------------------------------------------------------------------------------------------------------

// JOGOS: 

// Router:

const jogosRouter = require("./jogos");

router.use("/", jogosRouter);

// Swagger:

/**
 * @swagger
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Modifica os dados de uma avaliação específica.
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

// ATIVIDADES: 

// Router:

const partidasRouter = require("./partidas");

router.use("/", partidasRouter);

// Swagger:

/**
 * @swagger
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Modifica os dados de uma avaliação específica.
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

// DENUNCIAS:

// Router:

const denunciasRouter = require("./denuncias");

router.use("/", denunciasRouter);

// Swagger:

/**
 * @swagger
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Modifica os dados de uma avaliação específica.
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
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Modifica os dados de uma avaliação específica.
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

// LOGIN 

// Router:

const loginRouter = require("./login");

router.use("/", loginRouter);

// Swagger:

/**
 * @swagger
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Cria uma nova avaliação na API.
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
 *     summary: Retorna avaliação específica
 *     description: Retorna os detalhes de todas as avaliações cadastradas.
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
 *     description: Modifica os dados de uma avaliação específica.
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




