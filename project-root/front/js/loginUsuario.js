async function entrarUsuario(event) {
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
    
    if (result.success) {
        autenticado = true
        const userData = [{
            Id: result.data[0].id_usuario,
            email: result.data[0].email,
            name: result.data[0].nome,
            autentication: autenticado,
            permission: result.data[0].status_permissão.toUpperCase()
        }]
        
        localStorage.setItem('login', JSON.stringify(userData))
        
        // Exibir SweetAlert e aguardar fechamento
        await Swal.fire({
            title: 'Autenticação',
            text: `${result.message}. Usuário autenticado!`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        // Redirecionar após o usuário fechar o alerta
        window.location.href = '../public/Dashboard/index.html'
        return
        
    } else {
        Swal.fire({
            title: 'Autenticação',
            text: `${result.message}`,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }
}