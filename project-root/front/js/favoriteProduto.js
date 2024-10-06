async function getFavoritesProducts() {
    let dadosJson = localStorage.getItem("Favoritos")
    let dadosProduto = JSON.parse(dadosJson)

    dadosProduto.forEach(async(conteudo) => {
      let response = await fetch(
        `http://localhost:3001/favoritos/exibir?UsuarioId=${conteudo.id_User}&ProdutoId=${conteudo.id_Product}`,
        {
          method: "GET"
        }
      )
      let result = await response.json()

      if (result.success) {
        showProducts(result.data)
      }
    })
  }

function showProducts(content){
    const dadosJson = localStorage.getItem('Favoritos')
    const dadosFavorite = JSON.parse(dadosJson)
    const UsuarioId = dadosFavorite.idUsuario


    const container_pocoes = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4')
    const container_especiarias = document.querySelector('.especiarias .row.row-cols-1.row-cols-md-3.g-4')
    const container_artefatos = document.querySelector('.Artefatos .row.row-cols-1.row-cols-md-3.g-4')

        content.forEach((product) => {
            let produto_tags_cadastro = product.tags.trim()
            const col = document.createElement('div')
            col.className = 'col'
            const card_content = document.createElement('div')
            card_content.className = 'card card-content mb-5'

            card_content.innerHTML = `
            <img class="productImg" src="../../uploads/${product.imagem}" class="card-img-top card-img" alt="${product.nome}">
                <div class="stars">
                    <h5 class="avaliacaoProduto">${product.avaliacaoproduto}</h5>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="card-body-items">
                    <h5 class="product-name">${product.nome}</h5>
                    <p class="product-descrition">${product.descricaoProduto}</p>
                    <p class="product-price">R$ ${product.valor.toFixed(2)}</p>
                    <div>
                        <h6>PRODUTO FAVORITADO!</h6>
                    </div>
                </div>
            `
            col.appendChild(card_content)
            if(produto_tags_cadastro === 'POÇÕES' || produto_tags_cadastro === 'poções'){
                container_pocoes.appendChild(col)
            } else if (produto_tags_cadastro === 'ESPECIARIAS' || produto_tags_cadastro === 'especiarias'){
                container_especiarias.appendChild(col)
            } else if (produto_tags_cadastro === 'ARTEFATOS' || produto_tags_cadastro === 'artefatos'){
                container_artefatos.appendChild(col)
            } 
        })
}

function updateCartAccount(){
    const dadosJson = localStorage.getItem('carrinho')
    const dados = JSON.parse(dadosJson)
  
    if(!dados){
      let valueofItensInfos = document.getElementById("msg-add")
      Swal.fire({
        title: 'Carrinho',
        text: `Você tem o total de ${valueofItensInfos.textContent} produtos no carrinho! Adicione itens ao carrinho.`,
        icon: 'info',
        confirmButtonText: 'OK'
      })
      return
    } else {
      let valueofItensInfos = document.getElementById("msg-add")
      valueofItensInfos.textContent = dados.length 
    } 
} 
  
updateCartAccount()
getFavoritesProducts()