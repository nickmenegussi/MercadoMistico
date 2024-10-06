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

SELECT * FROM favoritos;
 
create table Compra (
    id_Compra int primary key auto_increment not null,
    data_compra datetime default current_timestamp,
    valor float not null,
    CarrinhoId int not null,
   
    foreign key (CarrinhoId) references Carrinho(id_carrinho)
);


create table Carrinho (
    id_carrinho int primary key auto_increment not null,
    UsuarioId int not null,
    ProdutoId int not null,
    
    foreign key (ProdutoId) references Produto(id_produto),
    foreign key (UsuarioId) references Usuario(id_usuario)
);
-- SELECT  c.CarrinhoId ,c.valor as valorTotalItem, p.descricaoProduto, p.tags, p.avaliacaoProduto, p.valor as valorProduto
-- FROM Compra c, Carrinho cart, Usuario u, Produto p
-- WHERE u.id_usuario = cart.UsuarioId
-- AND p.id_produto = cart.ProdutoId
-- AND u.id_usuario = 1 AND c.CarrinhoId = ;


create table Endereco(
	idEndereco int primary key auto_increment,
    UsuarioId int not null,
    cep varchar(10) not null,
    nomeDestinatario varchar(255) not null,
    bairro varchar(255) not null,
    numeroCasa int not null,
    complemento varchar(255) default null,
    cidade varchar(255) not null,
    estado varchar(255) not null,
    endereco varchar(255) not null,
    dataCriacao datetime default current_timestamp,
    
    foreign key (UsuarioId) references Usuario(id_usuario)
); 
 
create table Produto (
    id_produto int primary key auto_increment not null,
    nome varchar(255) not null,
    descricaoProduto varchar(255),
    valor float not null,
    tags varchar(255) not null,
    imagem varchar(255) not null,
    avaliacaoProduto float not null

);

SELECT * FROM PRODUTO;
