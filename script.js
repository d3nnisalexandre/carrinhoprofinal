let carrinho = [];

// Função para simular a adição de itens ao carrinho
function simularAdicionarItens() {
    const itensSimulados = [
        { nome: "Camiseta", preco: 39.90, quantidade: 2, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { nome: "Calça Jeans", preco: 89.90, quantidade: 1, descricao: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { nome: "Vestido", preco: 129.90, quantidade: 1, descricao: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
        { nome: "Jaqueta de Couro", preco: 199.90, quantidade: 1, descricao: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
        { nome: "Saia Midi", preco: 79.90, quantidade: 3, descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ];

    itensSimulados.forEach(item => adicionarAoCarrinho(item.nome, item.preco, item.quantidade, item.descricao));
}

function adicionarAoCarrinho(nome, preco, quantidade, descricao) {
    carrinho.push({nome, preco, quantidade, descricao});
    atualizarCarrinho();
}

function atualizarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) {
        // Remove o item do carrinho se a quantidade for zero ou negativa
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let listaCarrinho = document.getElementById('itens-carrinho');
    let resumoCarrinho = document.getElementById('resumo-carrinho');
    
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-carrinho';
        itemDiv.innerHTML = `
            <div class="item-imagem"></div>
            <div class="item-detalhes">
                <div class="item-texto">
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-descricao">${item.descricao}</div>
                </div>
                <div class="item-info-container">
                    <div class="item-info-box">
                        <span class="item-info-label">Quantidade</span>
                        <div class="quantidade-controle">
                            <button onclick="atualizarQuantidade(${index}, -1)">-</button>
                            <span class="item-info-valor">${item.quantidade}</span>
                            <button onclick="atualizarQuantidade(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="item-info-box">
                        <span class="item-info-label">Valor unitário</span>
                        <span class="item-info-valor">R$ ${item.preco.toFixed(2)}</span>
                    </div>
                    <div class="item-info-box">
                        <span class="item-info-label">Preço</span>
                        <span class="item-info-valor item-preco-total">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
        listaCarrinho.appendChild(itemDiv);
        total += item.preco * item.quantidade;
    });

    // Atualiza o resumo do carrinho
    resumoCarrinho.innerHTML = `
        <h2>Resumo do Pedido</h2>
        <div class="total">
            <span>Total:</span>
            <span id="total-carrinho">R$ ${total.toFixed(2)}</span>
        </div>
        <a href="#" id="finalizar-compra">Finalizar Compra</a>
    `;

    // Adiciona evento de clique ao link
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
}

function finalizarCompra(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    alert('Redirecionando para a página de checkout...');
    // Aqui você pode adicionar a lógica para redirecionar para a página de checkout
    // Por exemplo: window.location.href = '/checkout';
}

// Simular a adição de itens quando a página carregar
window.onload = simularAdicionarItens;
