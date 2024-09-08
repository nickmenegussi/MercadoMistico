function addProductToCart(event) {
  const ProdutoId = document.getElementById('data-id').dataset


  const data = {
    ProdutoId
    // UsuarioId,
  }
  

  function updateCartAccount(){
    let valueofItensInfos = document.getElementsByClassName("position-relative")
    console.log(valueofItens)
  }

  if (findProduct){
    alert("Você já adicionou um produto no carrinho! Se quiseres aumentar a quantidade, vá para o carrinho;")
  } else {
    cart.push(product)
    alert(`Você adicionou ao carrinho o produto ${data.nome}`)

  }
  
  
  updateCartAccount()


}

const addToCartButtons = document.getElementsByClassName("add-to-cart")

for (let i = 0; i < addToCartButtons.length; i++) {
addToCartButtons[i].addEventListener("click", addProductToCart)
}

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

      alert(`Seja muito bem-vindo ao nosso site, ${userDados.Nome}! Você tem privilégios extras`)
    } else if (userDados.Permissão === 'user'.toUpperCase()){
      const nomePagina = document.querySelector('.nome-usuario')
      nomePagina.textContent = `Nome: ${userDados.Nome}`

      const adminlink = document.querySelector('#adminlink')
      adminlink.innerHTML = `<a class="nav-link" href="../login.html">Sair</a>`;
      alert(`Seja muito bem-vindo ao nosso site, ${userDados.Nome} !`)
    }
  }
}

ExibirvaloresBD()
