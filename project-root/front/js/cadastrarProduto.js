async function SalvarInformacoes(event){
    event.preventDefault()

    const nome = document.getElementById("nome_produto").value
    const descricaoProduto = document.getElementById("descricaoProduto").value 
    const valor = document.getElementById("produtoPreco").value
    const tags = document.getElementById("produtoTags").value
    const imagem = document.getElementById("produtoImagem").files[0]
    const avaliacaoProduto = document.getElementById("avaliacaoProduto").value
    
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
        await Swal.fire({
            title: 'Produto',
            text: `${result.message}!`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: null // Remove o timer, permitindo interação do usuário
        })
        
    } else {
        await Swal.fire({
            title: 'Produto',
            text: `${result.message}!`,
            icon: 'warning',
            confirmButtonText: 'OK',
            allowOutsideClick: false, // Previne o fechamento ao clicar fora

        })
    }
}