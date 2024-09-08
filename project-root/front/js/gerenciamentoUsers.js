async function carregarContent(){
    const response = await fetch('http://localhost:3001/usuario/listar')

    const result = await response.json()

    if(result.success){
        carregarUsers(result.data)
    } else {
        console.log('Erro ao carregar produtos.')
    }
}

async function carregarUsers(contentUsers){
    const contentTable = document.querySelector('.conteudoTabela')
    
    contentUsers.forEach(user => {
        const linha_content = document.createElement('tr')
        linha_content.innerHTML = `
            <td class="userId">${user.id_usuario}</td>
            <td class="userName">${user.nome}</td>
            <td class="userEmail">${user.email}</td>
            <td class="userPassword">${user.senha}</td>
            <td class="userCPF">${user.cpf_usuario}</td>
            <td class="userPermission">${user.status_permissão}</td>

        `
        contentTable.appendChild(linha_content)  
    })
}
carregarContent()