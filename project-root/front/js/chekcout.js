async function updateProductsCart() {
  const dadosJson = localStorage.getItem("produtos");
  const dadosProduto = JSON.parse(dadosJson);

  const UsuarioId = dadosProduto.UsuarioId;
  const ProdutoId = dadosProduto.ProdutoId;

  const response = await fetch(
    `http://localhost:3001/carrinho/exibir?UsuarioId=${UsuarioId}&ProdutoId=${ProdutoId}`,
    {
      method: "GET"
    }
  );
  
  const result = await response.json();
  if (result.success) {
    const containerCarrinho = document.querySelector('.itensCarrinho .row')
    result.data.forEach((content) => {
      let newCartProduct = document.createElement("div");
      newCartProduct.className = "linhaofproducts mx-auto p-2 mt-3";
      newCartProduct.innerHTML = `
          <div class="col descritionsofcontent">
            <img class="productImg" src="./../../uploads/${content.imagem}" alt="${content.nome}">
            <h6>${content.nome}</h6>
          </div>
          <div class="col">
            <div class="container borda gap-2 text-center">
              <button class="button-diminuir">-</button>
              <div class="valor-quantidade">1</div>
              <button class="button-aumentar">+</button>
            </div>
          </div>
          <div class="col">
            <h6 class="mt-2 text-center product-price">R$${content.valor}</h6>
          </div>
          <div class="col">
            <h6 class="mt-2 text-center total-price">R$${content.valor}</h6>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger button-excluir">Excluir</button>
          </div>
        `
       containerCarrinho.appendChild(newCartProduct)

    })
    RemoverItem()
  }
}

function 

function RemoverItem(){
  const removeProductsdButtons = document.querySelector(".button-excluir")
  removeProductsdButtons.addEventListener('click', () => {
  // duas formas para remover o item
  // Primeira: Remover pegando a div que engloba todo o conteúdo que é a linhaofproducts
  const ProdutosCart = document.getElementsByClassName('linhaofproducts')
  localStorage.clear()
  ProdutosCart.remove()

  // Segunda: Pegando os parentElement...
  })
}

function updateQuantityandPriceTotal() {
  updateProductsCart()
  const cartProdcuts = document.getElementsByClassName("linhaofproducts")
  for (let i = 0; i < cartProdcuts.length; i++) {
    let quantity = 1

    const button_diminuir = cartProdcuts[i].getElementsByClassName("button-diminuir")
    const button_aumentar = cartProdcuts[i].getElementsByClassName("button-aumentar")[0]

    const productPrice = cartProdcuts[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",", ".")

    let productTotalPrice = cartProdcuts[i].getElementsByClassName("total-price")[0]
    let valueQuantity = cartProdcuts[i].getElementsByClassName("valor-quantidade")[0]

    function updateTotalAmount() {
      let totalAmount = quantity * productPrice
      productTotalPrice.innerText = "R$" + totalAmount.toFixed(2)
    }

    button_diminuir.addEventListener("click", () => {
      if (quantity > 1) {
        quantity -= 1
        valueQuantity.innerHTML = quantity
        updateTotalAmount()

      } else {
        alert("Erro. explicar o erro")
      }
    })
    button_aumentar.addEventListener("click", () => {
      quantity += 1
      valueQuantity.innerHTML = quantity
      updateTotalAmount()
    }
    )
    updateTotalAmount()
  }

}
updateProductsCart();
