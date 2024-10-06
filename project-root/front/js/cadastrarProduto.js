async function SalvarInformacoes(event){
    event.preventDefault()
    
    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('descricaoProduto', descricaoProduto) // Remover acento
    formData.append('valor', valor)
    formData.append('tags', tags)
    formData.append('imagem', imagem) 
    formData.append('avaliacaoProduto', avaliacaoProduto) // Remover acento

    const response = await fetch('http://localhost:3001/product/cadastrar', {
        method: 'POST',
        body: formData
    })

    const result = await response.json()

    if (result.success){
        Swal.fire({
            title: 'Produto',
            text: `${result.message}!`,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    } else {
        Swal.fire({
            title: 'Produto',
            text: `${result.message}!`,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }
}