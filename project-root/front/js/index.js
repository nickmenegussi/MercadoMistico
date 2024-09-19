async function addProductToCart() {
  const dadosJson = localStorage.getItem('login')
  const dadosUser = JSON.parse(dadosJson)


  const UsuarioId = dadosUser.Id
  const produto = document.querySelector('[data-id]')
  const ProdutoId = parseInt(produto.dataset.id)

  let data = {
    UsuarioId,
    ProdutoId
  }

  const response = await fetch('http://localhost:3001/carrinho/criar',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })


  const result = await response.json()

  if (result.success){
    localStorage.setItem('produtos', JSON.stringify(data))
    alert(`${result.message} e, por isso, iremos redirecionar você para a pagina do Carrinho!`)
    window.location.href = 'Checkout.html'
  }
  

  // function updateCartAccount(){
  //   let valueofItensInfos = document.getElementsByClassName("position-relative")
  //   console.log(valueofItens)
  // }

  // if (findProduct){
  //   alert("Você já adicionou um produto no carrinho! Se quiseres aumentar a quantidade, vá para o carrinho;")
  // } else {
  //   cart.push(product)
  //   alert(`Você adicionou ao carrinho o produto ${data.nome}`)

  // }
  
  
  // updateCartAccount()


}
addProductToCart()


// uso do result.data para pegar os valores do json que estão em uma lista de objetos e que geralmente nos retorna os dados da nossa API que tem o resultado e a data
async function ExibirvaloresBD(){
  const dadosJson = localStorage.getItem('login')
  const userDados = JSON.parse(dadosJson)

  if (!dadosJson){
    alert(`Você não está autenticado ainda, então, estamos redirecionando você para a página de login.`)
    window.location.href = '../login.html'
  }

  if(userDados.autenticação === true){
    if (userDados.Permissão === 'admin'.toUpperCase()){
      const nomePagina = document.querySelector('.nome-usuario')
      nomePagina.textContent = `Nome: ${userDados.Nome}`

      const adminlink = document.querySelector('#adminlink')
      adminlink.innerHTML =`<a class="nav-link text-light" href="../../private/DashboardAdmin/dashboard.html">Gerenciar Catálogos</a>`;

      console.log(`Seja muito bem-vindo ao nosso site, ${userDados.Nome}! Você tem privilégios extras`)
    } else if (userDados.Permissão === 'user'.toUpperCase()){
      const nomePagina = document.querySelector('.nome-usuario')
      nomePagina.textContent = `Nome: ${userDados.Nome}`

      const adminlink = document.querySelector('#adminlink')
      adminlink.innerHTML = `<a class="nav-link" href="../login.html">Sair</a>`;
      console.log(`Seja muito bem-vindo ao nosso site, ${userDados.Nome} !`)
    }
  }
}

ExibirvaloresBD()
