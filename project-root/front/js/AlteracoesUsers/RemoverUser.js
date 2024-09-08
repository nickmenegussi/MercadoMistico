async function ExibirBanco(){
    const response = await fetch('http://localhost:3001/usuario/listar', {
        method: 'GET',
    })
    const result = await response.json()

    if(result.success){
        alert(result.message)
        removerUser(result.data)
    } else {
        alert('Erro ao exibir produtos do Banco', result.message)
    }
}

async function removerUser(user) {
    const idinputValue = document.querySelector('.id_user')

    const result = await fetch(`/usuario/deletar/${idinputValue}`)
}