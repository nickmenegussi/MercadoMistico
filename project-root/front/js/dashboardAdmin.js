async function carregarContent() {
    const response = await fetch('http://localhost:3001/usuario/listar')

    const result = await response.json()
    if(result.success){
        carregarUsers(result.data)
    } else {
        alert('Erro ao carregar usuários.')
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

carregarContent()