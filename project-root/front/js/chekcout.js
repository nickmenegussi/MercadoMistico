async function getProducts() {
  let dadosJson = localStorage.getItem("carrinho");
  let dadosProduto = JSON.parse(dadosJson);

  dadosProduto.forEach(async(conteudo) => {
    let response = await fetch(
      `http://localhost:3001/carrinho/exibir?UsuarioId=${conteudo.Id_user}&ProdutoId=${conteudo.Id_Product}`,
      {
        method: "GET"
      }
    )
    let result = await response.json();

    if (result.success) {
      showProducts(result.data)
    }
  })
}


function updateCartAccount(){
  const dadosJson = localStorage.getItem('carrinho')
  const dados = JSON.parse(dadosJson)

  let valueofItensInfos = document.getElementById("msg-add")

  if(!dados){
    valueofItensInfos = 0
    Swal.fire({
      title: 'Carrinho',
      text: `Você tem o total de ${valueofItensInfos.textContent} produtos no carrinho! Adicione itens ao carrinho. Iremos redirecionar você para os catálogos`,
      icon: 'info',
      confirmButtonText: 'OK'
    })
    window.location.href= 'index.html'
    return
  } else {
    const itensFinalCart = document.getElementsByClassName('total-itens-final')[0]
    itensFinalCart.textContent = dados.length 
    valueofItensInfos.textContent = dados.length
    } 
} 

function showProducts(content){
  const carrinhoJSON = localStorage.getItem('carrinho')
  const dadosCarrinho = JSON.parse(carrinhoJSON)

  const containerCarrinho = document.querySelector('.itensCarrinho .row')
      content.forEach(products => {
        const itemCarrinho = dadosCarrinho.find(item => item.Id_Product === products.id_produto)

        const quantidadeValue = itemCarrinho.qtd
        const totalAmount = products.valor * quantidadeValue

        let newCartProduct = document.createElement("div");
        newCartProduct.className = "linhaofproducts mx-auto p-2 mt-3"
        // newCartProduct.setAttribute('data-id', products.id_produto)
        newCartProduct.innerHTML = `
            <div class="col descritionsofcontent">
              <img class="productImg" src="./../../uploads/${products.imagem}" alt="${products.nome}">
              <h6 class="product-name">${products.nome}</h6>
            </div>
            <div class="col">
              <div class="container borda gap-2 text-center">
                <button class="button-diminuir">-</button>
                <div class="valor-quantidade">${quantidadeValue}</div>
                <button class="button-aumentar">+</button>
              </div>
            </div>
            <div class="col">
              <h6 class="mt-2 text-center product-price">R$${products.valor.toFixed(2)}</h6>
            </div>
            <div class="col">
              <h6 class="mt-2 text-center total-price">R$${totalAmount.toFixed(2)}</h6>
            </div>
            <div class="col">
              <button type="button" class="btn btn-danger button-excluir" onclick="RemoverItem(event, ${products.id_produto})">Excluir</button>
            </div>
        `
       containerCarrinho.appendChild(newCartProduct)
    })

  updateQuantityandPriceTotal()
}

async function RemoverItem(event, idProduto){
  const itemHTML = event.target.parentNode.parentNode  
  const response = await fetch(`http://localhost:3001/carrinho/deletar/${idProduto}`,{
    method: 'DELETE'
  })
  const result = await response.json()

  const cartItems = JSON.parse(localStorage.getItem("carrinho")) || []

  //todos os produtos que não corresponderem ao idProduto serão colocados em uma lista
  const updateCart = cartItems.filter(item => item.Id_Product !== idProduto)
  
  // se o produto existir eu removo
  if(result.success){
    if (itemHTML){
      localStorage.setItem("carrinho", JSON.stringify(updateCart))
      itemHTML.remove()
    }
    Swal.fire({
      title: 'Carrinho',
      text: `${result.message}`,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }  else {
    Swal.fire({
      title: 'Carrinho',
      text: `${result.message}`,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }
}

function updateQuantityandPriceTotal() {
  const carrinhoJSON = JSON.parse(localStorage.getItem('carrinho')) || []
  const cartProducts = document.getElementsByClassName("linhaofproducts")
  
  for (let i = 0; i < cartProducts.length; i++) {
    // pegar o nome do produto e tirar se caso houver espaços
    let productNameELemento = cartProducts[i].getElementsByClassName('product-name')[0]
    let productName = productNameELemento.innerHTML.trim()

    // encontrar algum produto no carrinho com base no nome, fiz isso para poder atualizar a quantidade e o total do carinhho armazenados no localstorage
    const dadosCarrinho = carrinhoJSON.find(item => item.nome === productName)

    let quantity = parseInt(cartProducts[i].getElementsByClassName('valor-quantidade')[0].innerHTML)
    
    let button_aumentar = cartProducts[i].getElementsByClassName('button-aumentar')[0]
    let button_diminuir = cartProducts[i].getElementsByClassName('button-diminuir')[0] // Corrigido para o botão diminuir

    let productPrice = parseFloat(cartProducts[i].getElementsByClassName('product-price')[0].innerHTML.replace("R$", "").trim())
    let productTotalPriceElement = cartProducts[i].getElementsByClassName('total-price')[0] // Armazena o elemento para atualizar

    function UpdateTotal() {
      let totalAmount = quantity * productPrice;
      productTotalPriceElement.innerHTML = "R$" + totalAmount.toFixed(2).replace(".", ","); // Formatação correta
    }
    
    button_diminuir.addEventListener('click', () => {
      if (quantity > 1) {
        quantity -= 1
        cartProducts[i].getElementsByClassName('valor-quantidade')[0].innerHTML = quantity
        UpdateTotal()

        dadosCarrinho.qtd = quantity
        dadosCarrinho.total = quantity * productPrice
        localStorage.setItem('carrinho', JSON.stringify(carrinhoJSON))
      } else {
        Swal.fire({
          title: 'Quantidade produto',
          text: `Erro ao diminuir a quantidade`,
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    })
    
    button_aumentar.addEventListener('click', () => {
      quantity += 1
      cartProducts[i].getElementsByClassName('valor-quantidade')[0].innerHTML = quantity;
      UpdateTotal()

      dadosCarrinho.qtd = quantity
      dadosCarrinho.total = quantity * productPrice
      localStorage.setItem('carrinho', JSON.stringify(carrinhoJSON))
    });
  }
}

function updateUserInformation(){
  const dadosJson = localStorage.getItem('login')
  const userDados = JSON.parse(dadosJson)
  
  const userAccountCart = document.getElementsByClassName('contaUser')[0]
  userAccountCart.textContent = 'Conta: ' + userDados[0].name

  const userAccount = document.getElementsByClassName('conta-user')[0]
  userAccount.textContent = 'Conta: ' + userDados[0].name

}

updateUserInformation()
getProducts()
updateCartAccount()
