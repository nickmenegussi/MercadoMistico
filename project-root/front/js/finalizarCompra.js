async function getProducts(){
    const dadosJson = localStorage.getItem('carrinho')
    const dadosCart = JSON.parse(dadosJson)

    if(!dadosCart){
        Swal.fire({
            title: 'Carrinho',
            text: `Você não tem nenhum produto no carrinho, iremos redirecionar você para os catálogos`,
            icon: 'info',
            confirmButtonText: 'OK'
          })
        window.location.href = 'index.html'
    } else {
        dadosCart.forEach(async (conteudo, index) => {
            const response = await fetch(`http://localhost:3001/carrinho/exibir?UsuarioId=${conteudo.Id_user}&ProdutoId=${conteudo.Id_Product}`,
            {
            method: "GET"
         })
            const result = await response.json()
            if(result.success){
                // adicionar ao carrinho com base no indice do produto já armazenado antes
                dadosCart[index].id_carrinho = result.data[0].id_carrinho
                localStorage.setItem('carrinho', JSON.stringify(dadosCart))

                showProducts(result.data)
            }
    
        })
    }

}

function showProducts(content){
    const containerFinalizarPurchase = document.querySelector('.finalizarPurchase .row')
    const carrinhoJSON = localStorage.getItem('carrinho')
    const dadosCarrinho = JSON.parse(carrinhoJSON)

    if (!dadosCarrinho){
        let newMessage = document.createElement('div')
        newMessage.innerHTML = `
            <h1>CARRINHO VAZIo</h1>
        `
    } else {
        
        content.forEach((contents) => {
            const itemCarrinho = dadosCarrinho.find(item => item.Id_Product === contents.id_produto)
    
            let newCardProcut = document.createElement('div')
            newCardProcut.className = 'col-md-4 mb-4 mt-3'
            newCardProcut.innerHTML = `
                                <div class="card">
                                    <div class="card-body ">
                                        <h2>Resumo do Pedido</h2>
                                        <img class="productImg mb-2 mt-2" src="../../uploads/${contents.imagem}"></img>
                                        <p><strong>Produto:</strong> ${contents.nome}</p>
                                        <p><strong>Quantidade:</strong> ${itemCarrinho.qtd}</p>
                                        <p><strong>Preço:</strong> R$ ${contents.valor.toFixed(2).replace('.', ',')}</p>
                                        <p><strong>Frete:</strong> Sua compra está elegível para Frete Grátis</p>
                                        <p><strong>Total:</strong> R$ ${itemCarrinho.total.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
            `
            containerFinalizarPurchase.appendChild(newCardProcut)
        })

        const existeCardContent = document.querySelector('.finalizarPurchase .container')
        if(existeCardContent){
            existeCardContent.remove()
        }

        const totalContainer = document.createElement('div')
        totalContainer.className = 'container d-flex justify-content-between align-items-center'
        totalContainer.innerHTML = `
                         <h4 id="totalCompra"><strong>Total Carrinho:</strong> R$ ${content.valor}</h4>
                        <button class="btn btn-primary" onclick="confirmarCompra(event)">Confirmar Compra</button>
        `
        const CardContainer = document.querySelector('.finalizarPurchase')
        CardContainer.appendChild(totalContainer)
        
        TotalCompra()
    }
}

function consultarCEP(){
    let cep = document.querySelector('#cep').value 

    if (cep.length !== 8){
        Swal.fire({
            title: 'CEP',
            text: `CEP inválido!`,
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    } else {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if(data.erro){
                    Swal.fire({
                        title: 'CEP',
                        text: `O cep ${cep} não foi encontrado!`,
                        icon: 'warning',
                        confirmButtonText: 'OK'
                      })
                } else {
                    criarHTML(data)
                }
            })
    }
}

function criarHTML(DadosCEP){
    const containerContent = document.querySelector('.modal-content .contentNew')
    containerContent.innerHTML = `
                                <div class="form-group">
                                    <label for="nomeDestinatario">Nome do Destinatário:</label>
                                    <input type="text" class="form-control" id="nomeDestinatario" required>
                                </div>
                                <div class="form-group">
                                    <label for="numero">Número:</label>
                                    <input type="number" class="form-control" id="numero" required>
                                </div>
                                <div class="form-group">
                                    <label for="complemento">Complemento:</label>
                                    <input type="text" class="form-control" id="complemento">
                                </div>
                                <div class="form-group">
                                    <label for="bairro">Bairro:</label>
                                    <input type="text" class="form-control" id="bairro" required>
                                </div>
                                <div class="form-group">
                                    <label for="cidade">Cidade:</label>
                                    <input type="text" class="form-control" id="cidade" required>
                                </div>
                                <div class="form-group">
                                    <label for="estado">Estado:</label>
                                    <input type="text" class="form-control" id="estado" required>
                                </div> 
                                <div class="form-group">
                                    <label for="endereco">Endereço: </label>
                                    <input type="text" class="form-control" id="endereco" required>
                                </div>
    `
    document.getElementById('bairro').value = DadosCEP.bairro
    document.getElementById('cidade').value = DadosCEP.localidade
    document.getElementById('estado').value = DadosCEP.uf
    document.getElementById('endereco').value = `${DadosCEP.logradouro}` + `, ${DadosCEP.bairro} ` + `${DadosCEP.localidade}` + `, ${DadosCEP.uf}`
    
    cadastrarEndereco()
}

async function cadastrarEndereco(){
    const dadosJson = localStorage.getItem('login')
    const dataDados = JSON.parse(dadosJson)

    const UsuarioId = dataDados[0].Id
    const cep = document.getElementById('cep').value
    const nomeDestinatario = document.getElementById('nomeDestinatario').value
    const numeroCasa = document.getElementById('numero').value
    const complemento = document.getElementById('complemento').value
    const bairro = document.getElementById('bairro').value
    const cidade = document.getElementById('cidade').value
    const estado = document.getElementById('estado').value
    const endereco = document.getElementById('endereco').value

    const data = {
        UsuarioId,
        cep,
        nomeDestinatario,
        bairro,
        numeroCasa,
        complemento,
        cidade,
        estado,
        endereco
    }

    const response = await fetch('http://localhost:3001/endereco/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if(result.success){
        Swal.fire({
            title: 'Endereço',
            text: `${result.message}`,
            icon: 'success',
            confirmButtonText: 'OK'
          })

    } else {
        console.error(result.message)
    }
}

async function exibirEnderecosCadastrados(){
    const response = await fetch(`http://localhost:3001/endereco/exibir`)

    const result = await response.json()
    
    if(result.success){
        const containerEndereco = document.getElementById('endereco-options')
        result.data.forEach(endereco => {
            const option = document.createElement('option')
            option.textContent = `${endereco.endereco}, ${endereco.numeroCasa}`
            containerEndereco.appendChild(option)
        })

    }


}

function updateInformacoesClient(){
    const loginJson = localStorage.getItem('login')
    const dadosLogin = JSON.parse(loginJson)

    document.getElementById('nome').value = dadosLogin[0].name
    document.getElementById('email').value = dadosLogin[0].email

}

function TotalCompra(){
    const carrinhoJSON = localStorage.getItem('carrinho')
    const dadosCarrinho = JSON.parse(carrinhoJSON)
    
    //filtrar a busca do total dos produtos no dadosCarrinho e pega o valor total dele de cada item e soma

    let totalGeral = dadosCarrinho.reduce((contador, item) => contador + item.total, 0)
    document.getElementById('totalCompra').innerHTML = `<p id="totalCompra"><strong>Total:</strong> R$ ${totalGeral.toFixed(2).replace('.', ',')}</p>`    

}

async function confirmarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'))

    if(carrinho && carrinho.length > 0){
        carrinho.forEach(async(content) => {

            let valor = content.total
            let id_carrinho = content.id_carrinho


            let data = {
                valor,
                id_carrinho
            }
                    
                    
            let response = await fetch('http://localhost:3001/compra/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            
            let result = await response.json()
            
            if(result.success){
                Swal.fire({
                    title: 'Compra',
                    text: `${result.message}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
            } else {
                Swal.fire({
                    title: 'Compra inválida',
                    text: `${result.message}`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
            
        })
    }

}
function updateUserInformation(){
    const dadosJson = localStorage.getItem('login')
    const userDados = JSON.parse(dadosJson)
    
    const userAccountCart = document.getElementsByClassName('contaUser')[0]
    userAccountCart.textContent = 'Conta: ' + userDados[0].name
  
}
function updateCartAccount(){
    const dadosJson = localStorage.getItem('carrinho')
    const dados = JSON.parse(dadosJson)
  
    let valueofItensInfos = document.getElementById("msg-add")
  
    if(!dados){
      valueofItensInfos = 0
      Swal.fire({
        title: 'Carrinho',
        text: `Você tem o total de ${valueofItensInfos.textContent} produtos no carrinho! Adicione itens ao carrinho. Iremos redirecionar você para os catálogos`,
        icon: 'info',
        confirmButtonText: 'OK'
      })
      window.location.href= 'index.html'
      return
    } else {
      valueofItensInfos.textContent = dados.length
      } 
} 

updateCartAccount()
updateUserInformation()
updateInformacoesClient()
getProducts()
exibirEnderecosCadastrados()
