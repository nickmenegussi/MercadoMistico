create database MercadoMistico;
use MercadoMistico;
 
create table Usuario(
    id_usuario int primary key auto_increment not null,
    nome varchar(255) not null,
    cpf_usuario varchar(255) not null,
    email varchar(255) not null,
    senha varchar(255) not null,
    status_permissão varchar(255) not null
);
 
select * from Usuario;
 
create table Favoritos (
    id_Favoritos int primary key auto_increment not null,
    UsuarioId int not null,
    ProdutoId int not null,
   
    foreign key (UsuarioId) references Usuario(id_usuario),
    foreign key (ProdutoId) references Produto(id_produto)
);
 
create table Compra (
    id_Compra int primary key auto_increment not null,
    data_compra TIMESTAMP,
    valor float,
    CarrinhoId int not null,
   
    foreign key (CarrinhoId) references Carrinho(id_carrinho)
);
 
 
create table Carrinho (
    id_carrinho int primary key auto_increment not null,
    UsuarioId int not null,
    ProdutoId int not null,
    quantidade int not null,

    foreign key (ProdutoId) references Produto(id_produto),
    foreign key (UsuarioId) references Usuario(id_usuario)
);

-- select*from usuario;
-- select * from Carrinho;
-- select * from produto;
-- insert into carrinho(UsuarioId,ProdutoId,quantidade) values(1,1,12);

-- select p.nome, p.descriçãoProduto, p.valor, p.imagem
-- FROM Carrinho c, usuario u, produto p
-- WHERE c.UsuarioId = u.id_usuario 
-- and c.ProdutoId = p.id_produto
-- and u.id_usuario = 1;

-- select *
-- FROM carrinho c
-- INNER JOIN usuario u ON u.id_usuario = c.UsuarioId
-- RIGHT JOIN produto p ON p.id_produto = c.ProdutoId
-- WHERE u.id_usuario = 1;
 
create table Produto (
    id_produto int primary key auto_increment not null,
    nome varchar(255) not null,
    descriçãoProduto varchar(255),
    valor float not null,
    tags varchar(255) not null,
    imagem varchar(255) not null,
    avaliaçãoProduto float not null

);
