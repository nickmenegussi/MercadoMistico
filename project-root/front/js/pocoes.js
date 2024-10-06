async function carregarProdutos(){
    const response = await fetch('http://localhost:3001/product/exibir')
    const result = await response.json()
    
    if(result.success){
      updateProductsCart(result.data) // pegam os valores do json que serão exibidos 
      // para nós no result.data ou seja vao pegar os objetos dos valores cadastrados
    } else {
        console.error("Erro ao carregar produtos:", error)
    }
    
  }
    
    
    function updateProductsCart(produtos){
        // pegar o id do usuario
      let dadosJson = localStorage.getItem('login')
      let dadosUser = JSON.parse(dadosJson)
  
  
      let UsuarioId = dadosUser[0].Id
      const container_pocoes = document.querySelector('.section2 .row.row-cols-1.row-cols-md-3.g-4')
      const container_especiarias = document.querySelector('.especiarias .row.row-cols-1.row-cols-md-3.g-4')
      const container_artefatos = document.querySelector('.Artefatos .row.row-cols-1.row-cols-md-3.g-4')
      
      // Limpar o conteúdo anterior
        produtos.forEach(produto => {
            let produto_tags_cadastro = produto.tags.trim()
            const col = document.createElement('div')
            col.className = 'col';
            const card_content = document.createElement('div')
            card_content.className = `card card-content mb-5`
  
            // Adicionar o conteúdo HTML do card
            card_content.innerHTML = `
                <img class="productImg" src="../../uploads/${produto.imagem}" class="card-img-top card-img" alt="${produto.nome}">
                <div class="stars">
                    <h5 class="avaliacaoProduto">${produto.avaliacaoProduto}</h5>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="card-body-items">
                    <h5 class="product-name">${produto.nome}</h5>
                    <p class="product-descrition">${produto.descricaoProduto}</p>
                    <p class="product-price">R$ ${produto.valor.toFixed(2)}</p>
                    <div class="d-flex gap-5">
                      <button class="btn btn-primary mb-2" onclick="addProductToCart(${UsuarioId},${produto.id_produto}, ${produto.valor} ,'${produto.nome}')">ADICIONAR AO CARRINHO</button>
                      <button class="fv-button ms-5" onclick="addToFavorite(${UsuarioId}, ${produto.id_produto}, '${produto.nome}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                        </svg>
                      </button>
                    </div>
                </div>
            `
              col.appendChild(card_content)
              if (produto_tags_cadastro === 'POÇÕES'){
                container_pocoes.appendChild(col)
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
  carregarProdutos()