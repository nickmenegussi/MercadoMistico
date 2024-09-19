async function entrarUsuario(event){
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    let autenticado = false

    const data = {
        email,
        senha,
    }
    // trocar rota para a de login
    const response = await fetch('http://localhost:3001/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 

    const result = await response.json()
    if (result.success){
        alert(`${result.message}`+ '.' + 'Usuário autenticado!')
        autenticado = true
        const userData = {
            Id: result.data[0].id_usuario,
            Nome: result.data[0].nome,
            autenticação: autenticado,
            Permissão: result.data[0].status_permissão
        }
        localStorage.setItem('login',JSON.stringify(userData))
        window.location.href = '../public/Dashboard/index.html'
        
    } else {
        alert(result.message)
    }

}
