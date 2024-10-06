async function addProductToCart(UsuarioId, ProdutoId, ProdutoValor ,ProdutoNome) {

  let quantidade = 1
  // verificar primeiro se existe algum produto no carrinho senao adicionar uma lista
  let productCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // procurar na lista se existe algum produto já cadastro
  let produto = productCarrinho.find(item => item.Id_Product === ProdutoId)
  if(produto){
    produto.qtd++
    produto.total = parseFloat(ProdutoValor) * produto.qtd
  } else {
    productCarrinho.push({Id_user: UsuarioId,
      Id_Product: ProdutoId,
      qtd: quantidade,
      nome: ProdutoNome,
      valor: parseFloat(ProdutoValor),
      total: parseFloat(ProdutoValor) * quantidade})
  }
  
  localStorage.setItem('carrinho', JSON.stringify(productCarrinho))

  updateCartAccount()

  let data = {
    UsuarioId,
    ProdutoId,
  }


  const response = await fetch('http://localhost:3001/carrinho/criar',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let result = await response.json()
  
  if (result.success){
    Swal.fire({
      title: 'Produto Adicionado!',
      text: result.message,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  } 


}
addProductToCart()

function updateCartAccount(){
  const dadosJson = localStorage.getItem('carrinho')
  const dados = JSON.parse(dadosJson)
  let valueofItensInfos = document.getElementById("msg-add")


  if(!dados){
    valueofItensInfos.textContent = 0
    Swal.fire({
      title: 'Aviso!',
      text: `Você tem o total de ${valueofItensInfos.textContent} produtos no carrinho! Adicione itens ao carrinho.`,
      icon: 'info',
      confirmButtonText: 'Ok'
    })
  } else {
    valueofItensInfos.textContent = dados.length 
    } 
} 
  

// uso do result.data para pegar os valores do json que estão em uma lista de objetos e que geralmente nos retorna os dados da nossa API que tem o resultado e a data
function showUser() {
  const dadosJson = localStorage.getItem('login')
  const userDados = JSON.parse(dadosJson)

  // Verifica se não há dados de login
  if (!dadosJson) {
    Swal.fire({
      title: 'Acesso Negado!',
      text: `Você não está autenticado ainda, então, estamos redirecionando você para a página de login.`,
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    window.location.href = '../login.html'
  }

  // Verifica se o usuário está autenticado
  if (userDados[0].autentication === true) {
    const nomePagina = document.querySelector('.nome-usuario')
    nomePagina.textContent = `Nome: ${userDados[0].name}`

    const adminlink = document.querySelector('#adminlink')

    if (userDados[0].permission === 'ADMIN') {
      adminlink.innerHTML = `<a class="nav-link text-light" href="../../private/DashboardAdmin/dashboard.html">Gerenciar Catálogos</a>`
      
      // Verifica se a mensagem já foi exibida
      if (!localStorage.getItem('adminWelcomeMessageShown')) {
        Swal.fire({
          title: 'Autenticação',
          text: `Seja muito bem-vindo ao nosso site, ${userDados[0].name}! Você tem privilégios extras!`,
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        // Marca a mensagem como exibida
        localStorage.setItem('adminWelcomeMessageShown', 'true')
      }
    } else if (userDados[0].permission === 'USER') {
      adminlink.innerHTML = `<a class="nav-link" href="../perfil.html">Sair</a>`
      
      // Verifica se a mensagem já foi exibida
      if (!localStorage.getItem('userWelcomeMessageShown')) {
        Swal.fire({
          title: 'Autenticação',
          text: `Seja muito bem-vindo ao nosso site, ${userDados[0].name}!`,
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        // Marca a mensagem como exibida
        localStorage.setItem('userWelcomeMessageShown', 'true')
      }
    }
  }
}

function logout() {
  // Código para fazer logout...
  localStorage.removeItem('adminWelcomeMessageShown')
  localStorage.removeItem('userWelcomeMessageShown')
}

async function addToFavorite(UsuarioId, ProdutoId, ProdutoNome){
  let storeFavorite = JSON.parse(localStorage.getItem('Favoritos')) || []
  let Productfavorite = storeFavorite.find(item => item.id_Product === ProdutoId)

  if(Productfavorite){
    Swal.fire({
      title: 'Produto Favorito',
      text: `O Produto já foi favoritado! E iremos redirecionar você para a página de favoritos!`,
      icon: 'info',
      confirmButtonText: 'OK'
    })
    window.location.href = 'produtosFavoritos.html'
  } else {
    storeFavorite.push({id_Product: ProdutoId, id_User: UsuarioId})
    localStorage.setItem('Favoritos', JSON.stringify(storeFavorite)) // Armazena no localStorage apenas aqui

    const data = {
      UsuarioId,
      ProdutoId
    }

    const response = await fetch('http://localhost:3001/favoritos/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if(result.success){
      Swal.fire({
        title: 'Favoritar',
        text: `${result.message} ${ProdutoNome}`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } else {
      Swal.fire({
        title: 'Favoritar',
        text: `${result.message}`,
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
    }
  }
}

showUser()

