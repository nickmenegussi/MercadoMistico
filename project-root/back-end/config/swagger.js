const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Mercado Místico',
        version: '1.0.0',
        description: 'Documentação da API do Projeto Mercado Místico',
    },
    servers: [
        {
            url: `http://localhost:3001`, // Altere 3001 para sua porta se necessário
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['../back-end/config/swagger.js', '../server.js'], // Ajuste os caminhos conforme sua estrutura
}

// Inicializa o swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

module.exports = { swaggerSpec }

/**
 * @swagger
 * tags:
 *   - name: Carrinho
 *     description: Rotas relacionadas ao carrinho de compras
 */

/**
 * @swagger
 * /carrinho/criar:
 *   post:
 *     tags: [Carrinho]
 *     summary: Criar um item no carrinho
 *     description: Cria um novo item no carrinho para um usuário.
 *     parameters:
 *       - name: UsuarioId
 *         in: body
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *       - name: ProdutoId
 *         in: body
 *         required: true
 *         description: ID do produto.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Item criado com sucesso.
 *       400:
 *         description: Erro ao criar item no carrinho.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /carrinho/exibir:
 *   get:
 *     tags: [Carrinho]
 *     summary: Exibir itens do carrinho
 *     description: Retorna todos os itens do carrinho de um usuário.
 *     parameters:
 *       - name: UsuarioId
 *         in: query
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *       - name: ProdutoId
 *         in: query
 *         required: true
 *         description: ID do produto.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Itens do carrinho exibidos com sucesso.
 *       400:
 *         description: Erro ao encontrar os itens do carrinho.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /carrinho/deletar/{id}:
 *   delete:
 *     tags: [Carrinho]
 *     summary: Deletar item do carrinho
 *     description: Remove um item do carrinho pelo ID do produto.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser removido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso.
 *       400:
 *         description: Erro ao encontrar o item.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * tags:
 *   - name: Usuario
 *     description: Rotas relacionadas ao gerenciamento de usuários
 */

/**
 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     tags: [Usuario]
 *     summary: Cadastrar um usuário
 *     description: Cria um novo usuário.
 *     parameters:
 *       - name: nome
 *         in: body
 *         required: true
 *         description: Nome do usuário.
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         description: Email do usuário.
 *         schema:
 *           type: string
 *       - name: senha
 *         in: body
 *         required: true
 *         description: Senha do usuário.
 *         schema:
 *           type: string
 *       - name: cpf_usuario
 *         in: body
 *         required: true
 *         description: CPF do usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Erro ao cadastrar usuário.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     tags: [Usuario]
 *     summary: Realizar login
 *     description: Autentica um usuário existente.
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: Email do usuário.
 *         schema:
 *           type: string
 *       - name: senha
 *         in: body
 *         required: true
 *         description: Senha do usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       400:
 *         description: Email ou senha incorretos.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/editar/{id}:
 *   put:
 *     tags: [Usuario]
 *     summary: Atualizar informações do usuário
 *     description: Atualiza os dados de um usuário existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *       - name: nome
 *         in: body
 *         required: true
 *         description: Nome do usuário.
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         description: Email do usuário.
 *         schema:
 *           type: string
 *       - name: senha
 *         in: body
 *         required: true
 *         description: Senha do usuário.
 *         schema:
 *           type: string
 *       - name: cpf_usuario
 *         in: body
 *         required: true
 *         description: CPF do usuário.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso.
 *       400:
 *         description: Erro ao atualizar informações.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/deletar/{id}:
 *   delete:
 *     tags: [Usuario]
 *     summary: Deletar usuário
 *     description: Remove um usuário pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser removido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *       400:
 *         description: Erro ao encontrar o usuário.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/listar:
 *   get:
 *     tags: [Usuario]
 *     summary: Listar usuários
 *     description: Retorna a lista de usuários registrados.
 *     responses:
 *       200:
 *         description: Usuários listados com sucesso.
 *       400:
 *         description: Erro ao listar usuários.
 *       500:
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * tags:
 *   - name: Usuario Admin
 *     description: Rotas relacionadas ao gerenciamento do usuário admin
 */

/**
 * @swagger
 * /usuario/cadastrarAdmin:
 *   post:
 *     tags: [Usuario Admin]
 *     summary: Cadastrar um administrador
 *     description: Cria um novo usuário com permissão de administrador.
 *     parameters:
 *       - name: nome
 *         in: body
 *         required: true
 *         description: Nome do administrador.
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         description: Email do administrador.
 *         schema:
 *           type: string
 *       - name: senha
 *         in: body
 *         required: true
 *         description: Senha do administrador.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Administrador cadastrado com sucesso.
 *       400:
 *         description: Erro ao cadastrar administrador.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/atualizarAdmin/{id}:
 *   put:
 *     tags: [Usuario Admin]
 *     summary: Atualizar informações do administrador
 *     description: Atualiza os dados de um administrador existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do administrador a ser atualizado.
 *         schema:
 *           type: integer
 *       - name: nome
 *         in: body
 *         required: true
 *         description: Nome do administrador.
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         description: Email do administrador.
 *         schema:
 *           type: string
 *       - name: senha
 *         in: body
 *         required: true
 *         description: Senha do administrador.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Informações atualizadas com sucesso.
 *       400:
 *         description: Erro ao atualizar informações.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario/deletarAdmin/{id}:
 *   delete:
 *     tags: [Usuario Admin]
 *     summary: Deletar administrador
 *     description: Remove um administrador pelo ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do administrador a ser removido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrador removido com sucesso.
 *       400:
 *         description: Erro ao encontrar o administrador.
 *       500:
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /product/cadastrar:
 *   post:
 *     tags: [Produtos]
 *     summary: Cadastra um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricaoProduto:
 *                 type: string
 *               valor:
 *                 type: number
 *               tags:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *               avaliacaoProduto:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao adicionar produto
 */

/**
 * @swagger
 * /product/exibir:
 *   get:
 *     tags: [Produtos]
 *     summary: Exibe todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos exibida com sucesso
 *       401:
 *         description: Erro ao exibir produtos
 */

/**
 * @swagger
 * /product/editar/{id}:
 *   put:
 *     tags: [Produtos]
 *     summary: Edita um produto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser editado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricaoProduto:
 *                 type: string
 *               valor:
 *                 type: number
 *               tags:
 *                 type: string
 *               imagem:
 *                 type: string
 *               avaliacaoProduto:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 *       400:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao editar produto
 */

/**
 * @swagger
 * /product/deletar/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Deleta um produto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao deletar produto
 */
/**
 * @swagger
 * /endereco/criar:
 *   post:
 *     summary: Criar um novo endereço
 *     description: Adiciona um novo endereço ao sistema
 *     tags: [Endereço]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UsuarioId:
 *                 type: integer
 *               cep:
 *                 type: string
 *               nomeDestinatario:
 *                 type: string
 *               bairro:
 *                 type: string
 *               numeroCasa:
 *                 type: string
 *               complemento:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *       500:
 *         description: Erro ao adicionar o endereço
 */
/**
 * @swagger
 * /endereco/exibir:
 *   get:
 *     summary: Exibir todos os endereços
 *     description: Retorna uma lista de endereços cadastrados
 *     tags: [Endereço]
 *     responses:
 *       200:
 *         description: Lista de endereços
 *       500:
 *         description: Erro ao exibir os endereços
 */
/**
 * @swagger
 * /endereco/editar/{id}:
 *   put:
 *     summary: Editar um endereço existente
 *     description: Atualiza as informações de um endereço existente
 *     tags: [Endereço]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UsuarioId:
 *                 type: integer
 *               cep:
 *                 type: string
 *               nomeDestinatario:
 *                 type: string
 *               bairro:
 *                 type: string
 *               numeroCasa:
 *                 type: string
 *               complemento:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       400:
 *         description: Nenhum endereço encontrado com o ID fornecido
 *       500:
 *         description: Erro ao atualizar o endereço
 */
/**
 * @swagger
 * /endereco/deletar/{id}:
 *   delete:
 *     summary: Deletar um endereço existente
 *     description: Remove um endereço do sistema
 *     tags: [Endereço]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço removido com sucesso
 *       400:
 *         description: Nenhum endereço encontrado com o ID fornecido
 *       500:
 *         description: Erro ao remover o endereço
 */
/**
 * @swagger
 * /compra/criar:
 *   post:
 *     summary: Finalizar uma compra
 *     description: Cria um novo registro de compra com base no carrinho fornecido
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 description: Valor total da compra
 *               id_carrinho:
 *                 type: integer
 *                 description: ID do carrinho associado à compra
 *     responses:
 *       201:
 *         description: Compra finalizada com sucesso
 *       400:
 *         description: Erro ao finalizar a compra (ID do carrinho não existe ou pedido já foi finalizado)
 *       500:
 *         description: Erro interno do servidor
 */
/**
 * @swagger
 * /compra/exibir:
 *   get:
 *     summary: Exibir compras de um usuário
 *     description: Recupera as compras associadas a um usuário específico e ao carrinho fornecido
 *     tags: [Compra]
 *     parameters:
 *       - in: query
 *         name: UsuarioId
 *         required: true
 *         description: ID do usuário cujas compras serão recuperadas
 *         schema:
 *           type: integer
 *       - in: query
 *         name: CarrinhoId
 *         required: true
 *         description: ID do carrinho associado às compras
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compras recuperadas com sucesso
 *       400:
 *         description: Erro ao encontrar compras (usuário ou carrinho não existe)
 *       500:
 *         description: Erro interno do servidor
 */
/**
 * @swagger
 * /compra/editar/{id}:
 *   put:
 *     summary: Atualizar uma compra
 *     description: Atualiza o valor de uma compra existente
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da compra a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 description: Novo valor da compra
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar a compra (ID não encontrado)
 *       500:
 *         description: Erro interno do servidor
 */
 
/**
 * @swagger
 * /compra/deletar/{id}:
 *   delete:
 *     summary: Deletar uma compra
 *     description: Remove uma compra existente do sistema
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da compra a ser removida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compra removida com sucesso
 *       400:
 *         description: Erro ao remover a compra (ID não encontrado)
 *       500:
 *         description: Erro interno do servidor
 */