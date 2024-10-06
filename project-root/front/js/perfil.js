async function getDdadosUser(){
    const response = await fetch('http://localhost:3001/usuario/listar', {
        method: "GET"
    })
    const result = await response.json()

    if (result.success){
        criarHTML(result.data)
        userInfos(result.data)
    }
}

function criarHTML(dados){
    const dadosUser = JSON.parse(localStorage.getItem('login'))
    dados.forEach(dadosInfo => {
        if(dadosInfo.id_usuario === dadosUser[0].Id){
            const containerDados = document.querySelector('.row')
            const NewContent = document.createElement('div')
            NewContent.className = 'col-md-6 '
            NewContent.innerHTML = `
            <div class="card">
                <div class="card-header text-center">
                    <h4>Informações do Usuário</h4>
                </div>
                <div class="card-body">
                    <p><strong>Nome:</strong> <span id="userName">${dadosInfo.nome}</span></p>
                    <p><strong>Email:</strong> <span id="userEmail">${dadosInfo.email}</span></p>
                    <p><strong>Cpf:</strong> <span id="userCPF">${dadosInfo.cpf_usuario}</span></p>
                    <p><strong>Senha:</strong> <span id="userSenha">${dadosInfo.senha}</span></p>
                    <p><strong>Status:</strong> <span id="userStatus">${dadosInfo.status_permissão}</span></p>
                    <p><strong>Data de Registro:</strong> <span id="userRegistrationDate">${dadosInfo.dataCriacao}</span></p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#myModal" style="width: 19vw;">Alterar Dados</button>
                        <button class="btn btn-primary mb-2" style="width: 19vw;" onclick="Sair(event)">Log Out</button>
                    </div>
                    

                </div>
            </div>
            `
            containerDados.appendChild(NewContent)
        }
        const modalAlterDados = `
                <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Informações do Usuário</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" id="close-modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card-forms mx-auto" style="width: 35vw;">
                                    <div class="forms" id="#section1">
                                        <form id="userForm">
                                            <div class="mb-3">
                                                <label for="novoNome" class="form-label">Nome</label>
                                                <input type="text" class="form-control" id="novoNome" placeholder="Nome do Usuário" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="novoEmail" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="novoEmail" placeholder="Email do Usuário" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="novaSenha" class="form-label">Senha</label>
                                                <input type="password" class="form-control" id="novaSenha" placeholder="Senha do Usuário" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="novoCPF" class="form-label">CPF</label>
                                                <input type="text" class="form-control" id="novoCPF" placeholder="CPF do Usuário" required>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="submit" class="btn btn-primary" onclick="AlterarDados()">Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            
            `
            document.body.insertAdjacentHTML('beforeend', modalAlterDados)
    })
}

function userInfos(dadosInfo){
    if (!dadosInfo || dadosInfo === null || dadosInfo === undefined){
        Swal.fire({
            title: 'Usuário',
            text: `Erro ao encontrar o Usuário!`,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    } else {
        document.getElementById('novoNome').value = dadosInfo[0].nome
        document.getElementById('novoEmail').value = dadosInfo[0].email
        document.getElementById('novaSenha').value = dadosInfo[0].senha
        document.getElementById('novoCPF').value = dadosInfo[0].cpf_usuario
    }
}
function logout() {
    // Código para fazer logout...
    localStorage.removeItem('adminWelcomeMessageShown')
    localStorage.removeItem('userWelcomeMessageShown')
}

async function AlterarDados(){
    const dadosUser = JSON.parse(localStorage.getItem('login'))

    const userId = dadosUser[0].Id
    const nome = document.getElementById('novoNome').value 
    const email = document.getElementById('novoEmail').value
    const senha = document.getElementById('novaSenha').value
    const cpf_usuario = document.getElementById('novoCPF').value

    const data = {
        nome,
        email,
        senha,
        cpf_usuario,
        userId
    }

    const response = await fetch(`http://localhost:3001/usuario/editar/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        
    })

    const result = await response.json()
    if(result.success){
        Swal.fire({
            title: 'Usuário',
            text: `${result.message}`,
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    }
}

async function dontExistLogin(){
    const dadosJson = localStorage.getItem('login')
    const userDados = JSON.parse(dadosJson)

  // Verifica se não há dados de login
  if (!userDados) {
    await Swal.fire({
      title: 'Login Encerrado!',
      text: `Você não está autenticado ainda, então, estamos redirecionando você para a página de login.`,
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
    window.location.href = 'login.html'
  }
}

function Sair(){
    localStorage.removeItem('login')
    logout() 
    dontExistLogin()

}

getDdadosUser()

