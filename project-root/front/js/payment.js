async function exibirCompra(){
    const carrinho = JSON.parse(localStorage.getItem('carrinho'))

    carrinho.forEach(async(content) => {
        const response = await fetch(`http://localhost:3001/compra/exibir?UsuarioId=${content.Id_user}&CarrinhoId=${content.id_carrinho}`, {
            method: 'GET'
        })

        const result = await response.json()

        if(result.success){
            showProducts(result.data)
        }
    })
}

function showProducts(content) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'))

    const containerCompras = document.querySelector('.compras .row')
    content.forEach((contents) => {
        const compraContent = document.createElement('div')
        compraContent.className = 'col-md-4 mb-4 mt-3'
        compraContent.innerHTML = `
           <div class="card">
                <div class="card-body ">
                    <h2>Resumo do Compra</h2>
                    <img class="productImg mb-2 mt-2" src="../../uploads/${contents.imagem}"></img>
                    <p><strong>Produto:</strong> ${contents.nome}</p>
                    <p><strong>Quantidade:</strong> ${carrinho[0].qtd}</p>
                    <p><strong>Preço:</strong> R$ ${contents.valorProduto}</p>
                    <p><strong>Frete:</strong> Sua compra está elegível para Frete Grátis</p>
                    <p><strong>Total:</strong> R$ ${contents.valorTotalItem.toFixed(2)}</p>
                </div>
            </div>
        `
        containerCompras.appendChild(compraContent)
    })
    const buttonpagar = document.querySelector('.buttonPagar')
    if (buttonpagar) {
        totalContainer.remove()
        buttonpagar.remove() // Remove o botão anterior, se existir
    }

    // Adicionar o botão de pagamento
    const totalContainer = document.createElement('div')
    totalContainer.className = 'container d-flex justify-content-between align-items-center'
    totalContainer.innerHTML = `
        <h4 id="totalCompra"><strong>Total Carrinho:</strong> R$ ${content[0].valorTotalCarrinho}</h4>
        <button class="btn btn-primary mb-3 buttonPagar" data-bs-toggle="modal" data-bs-target="#paymentModal">Pagar</button>
    `
    
    
    
    const modalMarkup = `
        <!-- Modal -->
        <div class="modal fade  modal-xl " id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="paymentModalLabel">Métodos de Pagamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container mt-3">
                            <div class="form-group">
                                <label class="selecioneMetodo" for="payment-method-select">Selecione um Método de Pagamento:</label>
                                <select class="form-control mt-3" id="payment-method-select">
                                    <option value="default">Selecione...</option>
                                    <option value="boleto">Boleto Bancário</option>
                                    <option value="pix">Pix</option>
                                    <option value="creditCard">Cartão de Crédito</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                        </div>
                        <div class="credit-card-form mt-4" id="credit-card-fields" style="display: none;">
                            <form id="paymentForm">
                                <div class="credit-card">
                                    <div class="card-top">
                                        <div class="chip"></div>
                                        <div class="logo">VISA</div>
                                    </div>
                                    <div class="card-number">
                                        <label for="cardNumber">Número do Cartão:</label>
                                        <input type="text" id="cardNumber" class="form-control" placeholder="**** **** **** ****" maxlength="19" required>
                                    </div>
                                    <div class="card-details">
                                        <div class="form-group">
                                            <label for="expiryDate">Validade:</label>
                                            <input type="text" id="expiryDate" class="form-control" placeholder="MM/AA" maxlength="5" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="cvv">CVV:</label>
                                            <input type="text" id="cvv" class="form-control" placeholder="CVV" maxlength="3" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="total-section">
                                    <div class="form-group">
                                        <label for="totalAmount">Total a Pagar:</label>
                                        <input type="text" id="totalAmount" class="form-control" disabled>
                                    </div>
                                    <button type="submit" class="btn btn-success" onclick="confirmedPurchase(event)">Pagar Agora</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    document.body.insertAdjacentHTML('beforeend', modalMarkup) // Adiciona o modal ao body
    const CardContainer = document.querySelector('.compras')
    CardContainer.appendChild(totalContainer)

    TotalCompra()
    exibirMetodoPagamento()
}


function TotalCompra(){
    const carrinhoJSON = localStorage.getItem('carrinho')
    const dadosCarrinho = JSON.parse(carrinhoJSON)
    
    //filtrar a busca do total dos produtos no dadosCarrinho e pega o valor total dele de cada item e soma

    let totalGeral = dadosCarrinho.reduce((contador, item) => contador + item.total, 0)
    document.getElementById('totalCompra').innerHTML = `<p id="totalCompra"><strong>Total:</strong> R$ ${totalGeral.toFixed(2).replace('.', ',')}</p>`    

}


function TotalCompra(){
    const carrinhoJSON = localStorage.getItem('carrinho')
    const dadosCarrinho = JSON.parse(carrinhoJSON)
    
    //filtrar a busca do total dos produtos no dadosCarrinho e pega o valor total dele de cada item e soma

    let totalGeral = dadosCarrinho.reduce((contador, item) => contador + item.total, 0)
    document.getElementById('totalCompra').innerHTML = `<p id="totalCompra"><strong>Total:</strong> R$ ${totalGeral.toFixed(2).replace('.', ',')}</p>`    
    document.getElementById('totalAmount').value = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`
}
function exibirMetodoPagamento() {
    const metodoPagamento = document.getElementById('payment-method-select')
    const creditCardFields = document.getElementById('credit-card-fields')
    
    // Adiciona um listener para o evento 'change'
    metodoPagamento.addEventListener('change', (event) => {
        const selectedValue = event.target.value // Obter o valor da opção selecionada

        // Verifica se o método de pagamento selecionado é "Cartão de Crédito"
        if (selectedValue === 'creditCard') {
            creditCardFields.style.display = 'block'; // Exibe os campos do cartão de crédito
            atualizarNumberCart()
            atualizarValidadeCart()
            atualizarCVV()
        } else {
            creditCardFields.style.display = 'none'; // Esconde os campos se não for cartão de crédito
        }
    })
}

function atualizarNumberCart() {
    const cardNumber = document.getElementById('cardNumber')
    cardNumber.addEventListener('input', function(event) {
        // Remove todos os caracteres que não são dígitos
        const cardValue = event.target.value.replace(/\D/g, '')

        // Formata o número do cartão com espaços
        const formattedValue = cardValue.replace(/(.{4})/g, '$1 ').trim()

        // Atualiza o valor do campo de entrada
        event.target.value = formattedValue // Mostra os números formatados
    })
}
function atualizarValidadeCart(){
    const expiryDate = document.getElementById('expiryDate')
    expiryDate.addEventListener('input', function(event) {
        // remoger todos os caracteres que não são dígitos
        const cartExpire = event.target.value.replace(/\D/g, '');

        let formattedExpire = ''
        // formatar o número da validade
        if(cartExpire.length >= 2){
            formattedExpire = cartExpire.slice(0, 2) + '/' + cartExpire.slice(2,4)
        }else if (cartExpire.length >= 1) {
            formattedExpire = cartExpire.slice(0, 2)
        } else {
            formattedExpire = cartExpire.slice(0, -1)
        }

        event.target.value = formattedExpire

    })
}
function atualizarCVV(){
    const CVV = document.getElementById('cvv')
    CVV.addEventListener('input', function(event) {
        const valueCVV = event.target.value.replace(/\D/g, '')

        event.target.value = valueCVV
    })
}

async function confirmedPurchase(event){
    event.preventDefault()

    const purchase = JSON.parse(localStorage.getItem('carrinho'))
    await Swal.fire({
        title: 'Compra',
        text: `Você Acabou de comprar ${purchase.length} item / itens!`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      window.location.href = 'index.html'
    localStorage.removeItem('carrinho')

}

const dadosJson = localStorage.getItem('carrinho')
const dados = JSON.parse(dadosJson)
let valueofItensInfos = document.getElementById("msg-add")
  
  
if(!dados){
    valueofItensInfos.textContent = 0
    
    Swal.fire({
        title: 'Carrinho',
        text: `Você tem o total de ${valueofItensInfos.textContent} produtos no carrinho! Adicione itens ao carrinho.`,
        icon: 'info',
        confirmButtonText: 'OK'
      })
} else {
    valueofItensInfos.textContent = dados.length 
} 

function updateUserInformation(){
    const dadosJson = localStorage.getItem('login')
    const userDados = JSON.parse(dadosJson)
    
    const userAccountCart = document.getElementsByClassName('contaUser')[0]
    userAccountCart.textContent = 'Conta: ' + userDados[0].name
  
}
  
updateUserInformation()
exibirCompra()
