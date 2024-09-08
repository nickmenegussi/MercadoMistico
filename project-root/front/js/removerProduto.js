async function RemoverProduto(event) {
  event.preventDefault()
  const input_value = document.getElementById("number-produto").value;

  if (!input_value){
    alert('Os dados estão incompletos! Por favor, preencha os campos!')
  }
  const response = await fetch(`http://localhost:3001/product/deletar/${input_value}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const result = await response.json()

  if (result.success){
    alert(result.message)
  } else {
    alert(result.message)
  }
}

RemoverProduto()