async function carregarContent() {
    const response = await fetch('http://localhost:3001/usuario/listar')

    const result = await response.json()
    if(result.success){
        carregarUsers(result.data)
    } else {
        Swal.fire({
            title: 'Usuário',
            text: 'Erro ao carregar usuários.',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    }
}
async function carregarProdutos(){
    const response = await fetch('http://localhost:3001/product/exibir')
    const result = await response.json()

    if (result.success){
        exibirProdutos(result.data)
    } else {
        Swal.fire({
            title: 'Produto',
            text: `${result.message}!`,
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    }
}


async function carregarUsers(contentUsers){
    const contentTable = document.querySelector('.conteudoTabela')
    let contandor = 0

    contentUsers.forEach(user => {
        if (contandor >= 10){
            return// usado para parar com a repetição em um laço foreach
        }
        const linha_content = document.createElement('tr')
        linha_content.innerHTML = `
            <td class="userId">${user.id_usuario}</td>
            <td class="userName">${user.nome}</td>
            <td class="userEmail">${user.email}</td>
            <td class="userCPF">${user.cpf_usuario}</td>
            <td class="userPermission">${user.status_permissão}</td>
        `
        contentTable.appendChild(linha_content)
        contandor += 1
    })
}


function exibirProdutos(produtos){
    const conteudoTabela = document.querySelector('.conteudoTabelaUsers')
    let contador = 0
    produtos.forEach(produto => {       
        if (contador >= 10){
           return
        }
        const linhas_content = document.createElement('tr')
        linhas_content.innerHTML = `
                    <td class="ProductId">${produto.id_produto}</td>
                    <td class="ProductTitle">${produto.nome}</td>
                    <td class="ProductTags">${produto.tags}</td>
                    <td class="ProductPrice">${produto.valor}</td>
                    <td class="ProductFeeback">${produto.avaliacaoProduto}</td>
                        
        `
        conteudoTabela.appendChild(linhas_content)
        contador += 1
    })
    
}


carregarProdutos()
carregarContent()