# MERCADO MISTICO API

Bem-vindo à API MERCADO MISTICO!

## Descrição

Esta API permite gerenciar e interagir com os recursos do MERCADO MISTICO, incluindo produtos, compras, endereços e muito mais.

## Documentação da API

A documentação da API está disponível no seguinte local:

- **[Documentação Swagger](http://localhost:3001/api-docs/#/)**

### Como Acessar a Documentação Swagger

Para acessar a documentação da API, siga os passos abaixo:

1. **Clone o repositório:**
   - Para clonar o repositório, execute o seguinte comando no terminal:
     ```bash
     git clone https://github.com/nick/MERCADO_MISTICO.git
     ```
   - Substitua `seu_usuario` pelo seu nome de usuário do GitHub e `MERCADO_MISTICO` pelo nome do seu repositório.

2. **Navegue até o diretório do projeto:**
   - Acesse o diretório clonado:
     ```bash
     cd MERCADO_MISTICO
     ```

3. **Certifique-se de que o Node.js esteja instalado:**
   - Você deve ter o Node.js instalado em sua máquina. Você pode verificar isso executando o seguinte comando no terminal:
     ```bash
     node -v
     ```
   - Se o Node.js não estiver instalado, você pode baixá-lo [aqui](https://nodejs.org/).

4. **Instale as dependências do projeto:**
   - Execute o seguinte comando para instalar as dependências necessárias:
     ```bash
     npm install
     ```
   - Isso instalará todas as dependências que estão listadas no seu arquivo `package.json`.

5. **Inicie o servidor da API:**
   - Execute o comando abaixo no terminal para iniciar o servidor:
     ```bash
     npm start
     ```
   - Esse comando deve iniciar o servidor, e você verá mensagens no terminal indicando que ele está rodando na porta 3001.

6. **Verifique se a API está rodando:**
   - Após iniciar o servidor, você deve ver uma mensagem indicando que a API está escutando na porta 3001.
   - Se tudo estiver correto, você pode abrir um navegador da web e digitar o link `http://localhost:3001/api-docs/#/` na barra de endereços. Isso deve carregar a interface Swagger UI, onde você pode interagir com a documentação da sua API.

### Dependências

Aqui estão as dependências do projeto:

- `body-parser`: ^1.20.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.5
- `express`: ^4.21.0
- `multer`: ^1.4.5-lts.1
- `mysql2`: ^3.11.0
- `nodemon`: ^3.1.4
- `swagger-jsdoc`: ^6.2.8
- `swagger-ui-express`: ^5.0.1
- `sweetalert2`: ^11.14.1