const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');


const port = 3001;

app.use(cors());
app.use(express.json({limit: '10mb'}));

//TESTE DE SERIVIDOR
app.listen(port, () => console.log(`Rodando na porta ${port}`));

//importar a conexao do banco
const connection = require('../back-end/config/db');

// ROTA PARA CRIAR OS ITENS QUE IRÃO PARA O CARRINHO

app.post('/carrinho/criar', (request, response) => {
    const quantidade = 1
    const UsuarioId = request.body.UsuarioId
    const ProdutoId = request.body.ProdutoId

    if (!UsuarioId || !ProdutoId){
        return response.status(400).json({success: false, message: "Preencha todos os campos de cadastro"})

    }

    const queryUsuario = `
        select id_usuario, id_produto
        FROM Carrinho c, Usuario u, Produto p
        WHERE c.UsuarioId = u.id_usuario
        AND c.ProdutoId = p.id_produto
        AND u.id_usuario = ?;
    `
    
    connection.query(queryUsuario, [UsuarioId, ProdutoId], (err, result) => {
        if(err){
            return response
                 .status(500)
                 .json({
                     success:false,
                     message: 'Erro ao consultar dados',
                     data: err
                 })
        }
        
        if (result.length > 0){
            return response
                .status(200)
                .json({
                    success: true,
                    message: `Voce ja adicionou esse produto`,
                })
        } else {
            
            const params = Array(
                UsuarioId,
                ProdutoId,
                quantidade
    
            )
            const query = `INSERT INTO Carrinho(UsuarioId, ProdutoId, quantidade) VALUES(?,?,?)`
            connection.query(query, params, (err, result) => {
    
                if(result){
                 return response
                    .status(201)
                    .json({
                        message: 'sucesso ao criar o carrinho',
                        success: true,
                        data: result
                    })
                } else {
                 return response 
                    .status(400)
                    .json({
                        message: `Usuário com o id: ${UsuarioId} ou o Produto com o id: ${ProdutoId} não foram encontrados.`,
                        success: false
                    })
                }
            })
        }
    })
})

// fazer join no sql para unir a tabela de carrinho,usuarios e produtos.
app.get('/carrinho/exibir', (request, response) => {
    const usuario = request.query.UsuarioId
    const produto = request.query.ProdutoId


    connection.query('SELECT * FROM Carrinho WHERE ProdutoId = ? AND UsuarioId = ?', [produto,usuario], (err, resultCarrinho) => {
        if(err){
            return response.status(500).json({
                success: false,
                message: 'Erro ao encontrar o carrinho no nosso sistema.',
                data: err
            })
        }

        if(resultCarrinho.length === 0){
            return response.status(400).json({
                message: `Erro ao encontrar o id ${produto} do produto ou o id ${usuario} do usuario.`
            })
        }

        const query = `SELECT p.nome, p.descricaoProduto, p.valor, p.imagem
            FROM Carrinho c, Usuario u, Produto p
            WHERE c.UsuarioId = u.id_usuario
            AND c.ProdutoId = p.id_produto
            AND u.id_usuario = c.UsuarioId;
        
        `
        connection.query(query,(err,result) => {
            if(err){
                return response.status(500).json({
                    message: 'Erro ao encontrar as informações no nosso sistema',
                    success: false,
                    data: err

                })
            }
            return response.status(200).json({
                message: 'Sucesso ao criar o carrinho',
                success: true,
                data: result
            })
        })
            
    
    })
})

//ROTA PARA CRIAR UM USUARIO ADM

 app.post('/usuario/cadastrarAdmin', (request, response) => {
     const {nome, email, senha,} = request.body 

    if (!nome || !email || !senha ){
        return response
        .status(400)
        .json({success: false, message: "Preencha todos os campos de cadastro"})
    }

     const queryAdmin = `SELECT * FROM Usuario WHERE status_permissão = 'ADMIN'`
     connection.query(queryAdmin, (err, result) => {
         if (err){
             response
                 .status(500)
                 .json({
                     success:false,
                     message: 'Erro ao verificar se existe um admin no sistema'
                 })
         }

        // verificar se já existe um admin cadastrado
        if (result.length > 0){
             response.status(403)
             .json({
                 success: false,
                 message: 'Já existe um administrador no sistema'
             })
            
        } 
            // const salt = await bcrypt.genSalt(12);
            // const passwordHash = await bcrypt.hash(senha, salt);


            const admin = [nome, email, senha,'******', 'ADMIN']
            const query = `INSERT INTO Usuario(nome, email, senha, cpf_usuario, status_permissão) VALUES(?,?,?,?,?)`
            connection.query(query, admin, (err, result) => {
                 if(result){
                         response
                         .status(201)
                         .json({
                                 success: true,
                                 message: "Administrador cadastrado com sucesso",
                                 data: result
                             })
                            
                     } else {
                         response
                             .status(400)
                             .json({
                                 success: false,
                                 message: "Erro ao cadastrar Administrador",
                                 data: err
                             })
                     }
                 })
         
        
     })    
 })

app.put('/usuario/atualizarAdmin/:id', (request, response) => {
    const params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.params.id,
        request.body.status_permissão
    )

    const query = `UPDATE Usuario
        SET nome = ?, email = ?, senha = ? WHERE id_usuario = ? AND status_permissão = 'ADMIN'
    `
    connection.query(query, params, (err, result) => {
        if (err){
            response 
            .status(400)
            .json({success: false, message: 'Erro ao atualizar as informações', err})
        } else {
            response
            .status(201)
            .json({
                sucess: true,
                message: 'Sucesso ao atualizar as informações.'
            })
        }
    }) 
})
app.delete('/usuario/deletarAdmin/:id', (request, response) => {
    let id = request.params.id 
    let status_permissão = request.body.status_permissão

    if (!id || !status_permissão){
        return response.status(400).json({
            success: false,
            message: "Preencha todos os campos."
        });
    }
    
    const query = `DELETE FROM Usuario WHERE id_usuario = ? AND status_permissão = ?`
    connection.query(query, [id, status_permissão], (err, result) => {
        if (err){
            return response.status(500).json({
                message: 'Erro ao procurar o Usuário no nosso sistema',
                success: false,
                data: err
            })
        }

        if (result.affectedRows === 0){
            return response.status(400).json({
                message: `O usuário com o id ${id} e a permissão ${status_permissão}, não foram encontrado no nosso sitema`,
                success: false,
                data: err
            })
        } else{
            response
            .status(201)
            .json({
                message: `Sucesso ao deletar o administrador com o id: ${id}.`,
                success: true,
                data: result
            })
        }
    })
})


//ROTA POST CADASTRO DE USUÁRIOS TER ( CREATE, READ, UPDATE AND DELETE)

app.post('/usuario/cadastrar', async (request, response) => {
    const { nome, email, senha, cpf_usuario} = request.body;

    if (!nome || !email || !senha || !cpf_usuario) {
        response.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro"
        });
    }

    // Criar os parâmetros para a consulta SQL
    const params = Array(nome, email, senha, cpf_usuario, 'USER')

    const query = `INSERT INTO Usuario(nome, email, senha, cpf_usuario, status_permissão) VALUES(?,?,?,?,?);`;
    connection.query(query, params, (err, result) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o usuário",
                data: err
            });
        } else {
             response.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: result
            });
        }
    });
});

app.post('/usuario/login', async (request, response) => {
     const { email, senha } = request.body;

    // verificar se os campos estão preenchidos
     if (!email || !senha) {
          return response.status(400).json({
             success: false,
             message: "Email e senha são obrigatórios"
        });
     }

    // Buscar no banco de dados se existe o email e a digitada
     const query = 'SELECT * FROM Usuario WHERE email = ? AND senha = ?';
     connection.query(query, [email, senha], async (err, result) => {
        // primeiro lidar com o erro do mySQL se existir
         if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar usuário",
                data: err
            })
        }   
        
        if (result.length > 0){
            return response.status(200).json({
                message: "Login realizado com sucesso",
                success: true,
                data: result
            })
        } else {
            return response.status(400).json({
                success: false,
                message: "E-mail ou senha estão incorretos!",
                data: err
            })
        } 
     })
 });

app.put('/usuario/editar/:id', (request, response) => {
    const userId = request.params.id

    // verificar se o id existe no banco
    connection.query('SELECT * FROM Usuario WHERE id_usuario = ?', userId ,(err,result) => {
        // trata de erros que ocorrem durante a execução da consulta SQL
        if(err){
            return response .status(500).json({
                message: `Erro ao encontrar usuário`,
                success: false,
                data: err
            })
        } 
        
        // verificar se existe um usuário com o id pegado do params da URL
        if (result.length === 0) {
            return response .status(400).json({
                message: `O id ${userId} não foi encontrado!`,
                success: false
            })
        } 

        let params = Array(
            request.body.nome,
            request.body.email,
            request.body.senha,
            request.body.cpf_usuario,
            userId
        )
    
        let query = `UPDATE Usuario
        SET nome = ?,email = ?,senha = ?,cpf_usuario = ? WHERE id_usuario = ?
        `
    
        connection.query(query, params, (err, Updateresult) => {
            if (Updateresult) {
                response
                    .status(200)
                    .json({
                        message: `Sucesso ao alterar o usuário com o id: ${userId}`,
                        success: true,
                        data: Updateresult
                    })
            } else {
                response
                    .status(400)
                    .json({
                        message: `Erro ao alterar o id: ${userId}`,
                        success: false,
                        data: err
                    })
            }

        })

    })
})

app.delete('/usuario/deletar/:id', (request, response) => {
    const userId = request.params.id
    // deletar primeiro todas as dependencias que a tabela do banco tem do id
    connection.query('DELETE FROM Carrinho WHERE UsuarioId = ?', userId)
    connection.query('DELETE FROM Usuario WHERE id_usuario = ?', userId, (err,result) => {
        if (err){
            return response.status(500).json({
                message: "Erro ao encontrar Usuario",
                success: false,
                data: err
            })
        }
        // se o affectedRows for zero, quero dizer que nenhum usuário foi encontrad e, portanto, não existe.
        if (result.affectedRows === 0){
            return response.status(400).json({
                message: `O id ${userId} não foi encontrado`,
                success: false,
                data: err
            })
        }
        
        response.status(201).json({
            message: `Usuario com o id ${userId} foi deletado com sucesso`,
            success: true,
            data: result
        })
            
    })
})

// ROTA PARA READ AS INFORMAÇÕES DOS USUÁRIOS REGISTRADO NO NOSSO BANCO
app.get('/usuario/listar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.cpf_usuario,
        request.body.status_permissão
    );

    let query = "SELECT * FROM Usuario";
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso ao listar os Usuários",
                    data: result,
                })

        } else
            response
                .status(400)
                .json({
                    success: false,
                    message: "erro ao listar os Usuários",
                    data: err
                })
    });
});

// ROTAS PARA PRODUTO (CREATE, READ, UPDATE AND DELETE)
// Configuração do Multer para armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../front/uploads/'); // Define a pasta onde as imagens serão salvas
    },
    filename: (request, file, cb) => {
        const fileName = request.body.nomeArquivo ? request.body.nomeArquivo : file.originalname;

        cb(null, fileName + path.extname(file.originalname)); // Define o nome do arquivo salvo
    }
});


// Aplicando o multer com as configurações
const upload = multer({
    storage: storage,
})

app.post('/product/cadastrar', upload.single('imagem'), (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.descricaoProduto, // Remover acento
        request.body.valor,
        request.body.tags,
        request.file ? request.file.filename : null, // A imagem vem do request.file
        request.body.avaliacaoProduto // Remover acento
    )

    if (!params[0] || !params[1] || !params[2] || !params[3] || !params[5]){
        return response.status(400).json({
            message: "Alguns campos estão vazios, preencha todos os campos!",
            success: false,
        })
    }

    let query = 'INSERT INTO Produto(nome, descricaoProduto, valor, tags, imagem, avaliacaoProduto) VALUES(?,?,?,?,?,?)'
    connection.query(query, params, (err, result) => {
        if (result) {
            return response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso ao adicionar os produtos",
                    data: result
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao adicionar os produtos",
                    data: err
                })
        }
    })
})
app.get('/product/exibir', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.descriçãoProduto,
        request.body.valor,
        request.body.tags,
        request.body.imagem,
        request.body.avaliaçãoProduto
    )

    let query = 'SELECT * FROM Produto'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})
app.put('/product/editar/:id', (request, response) => {
    let produtoId = request.params.id
    connection.query('SELECT * FROM Produto WHERE id_produto = ?', produtoId , (err, result) => {
        // verificar possivel erro ao buscar no Banco
        if (err){
            return response.status(500).json({
                message: `Erro ao buscar produto.`,
                success: false
            })
        }

        // verificar se caso não existir o produto com base no id digitado
        if (result.length === 0){
            return response.status(400).json({
                message: `Erro ao encontrar o produto de id ${produtoId} no nosso Estoque.`,
                success: false,
                data: err
            })

        }
        let params = Array(
            request.body.nome,
            request.body.descriçãoProduto,
            request.body.valor,
            request.body.tags,
            request.body.imagem,
            request.body.avaliaçãoProduto,
            produtoId
        )
    
    
    
        let query = `UPDATE Produto 
        SET nome = ?, descriçãoProduto = ?, valor = ?, tags = ?, imagem = ? ,avaliaçãoProduto = ? WHERE id_produto = ?`
        connection.query(query, params, (err, result) => {
            if (result) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso ao alterar os dados do Id: ${produtoId}!`,
                        data: result
                    })
            } else {
                response
                    .status(401)
                    .json({
                        success: false,
                        message: `Não foi possivel alterar os dados do Id: ${produtoId}.`,
                        data: err
                    })
            }
        })
    })
})
app.delete('/product/deletar/:id', (request, response) => {
    const {idProduct} = request.params.id 
    
    connection.query(`DELETE FROM Produto WHERE id_produto = ?`, idProduct, (err,result) => {
        if (err){
            return response.status(500)
            .json({
                success: true,
                message: "Erro ao consultar Produtos",
                data: err
            })
        }

        // verificar se existe o produto com base no Id
        if (result.affectedRows === 0){
            return response.status(401)
            .json({
                success: false,
                message: `O Produto com o id: ${idProduct} não existe.`,
                data: err
            })
        } 
        return response
            .status(201)
            .json({
                success: true,
                message: `Sucesso ao remover o produto com o id: ${idProduct}`,
                data: result
            })
    })
})

// ROTA PARA TABELA DE FAVORITOS( CREATE, READ,UPDATE AND REMOVE)
app.post('/cadastrar/favoritos', (request, response) => {
    let params = Array(
        request.body.UsuarioId,
        request.body.ProdutoId
    )
    let query = 'INSERT INTO Favoritos(UsuarioId, ProdutoId) VALUES(?,?)'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})