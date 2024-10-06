async function RemoverProduto(event) {
  event.preventDefault() // Previne o envio do formulário

  const input_value = document.getElementById("number-produto").value

  const response = await fetch(`http://localhost:3001/product/deletar/${input_value}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await response.json()

  if (result.success){ 
    let produtos = JSON.parse(localStorage.getItem('carrinho')) || [] // Obtenha a lista de produtos
    produtos = produtos.filter(produto => produto.id !== parseInt(input_value)) // Filtra o produto a ser removido

    localStorage.setItem('carrinho', JSON.stringify(produtos)) // Atualiza o localStorage com a lista filtrada

    Swal.fire({
      title: 'Carrinho',
      text: `${result.message}!`,
      icon: 'success',
      confirmButtonText: 'OK'
    })
  } else {
    Swal.fire({
      title: 'Carrinho',
      text: `${result.message}!`,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }
}

RemoverProduto()