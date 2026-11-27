//pega o que for digitado e entrega ao servidor

const formulario = document.getElementById('form-produto');

let idEmEdicao = null;

formulario.addEventListener('submit', async (evento) => { //vamos usar await (esperar o servidor responder). Sem o async, o await dá erro.
    evento.preventDefault(); // função sem nome pq só vai ser usado aqui

    const dados = {
        nome: document.getElementById('nome').value,
        preco: document.getElementById('preco').value,
        descricao: document.getElementById('descricao').value
    };

    if (idEmEdicao === null) {
        // cadastro novo
        await fetch('/produtos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(dados)
        });
    } else {
        // edição de um produto que já existe
        await fetch('/produtos/' + idEmEdicao, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        idEmEdicao = null;
        document.getElementById('botao-salvar').textContent = 'Adicionar';
    }

    formulario.reset();
    await carregarLista();
    alert('Produto salvo');

});

async function carregarLista() {
    const resposta = await fetch('/produtos');
    const produtos = await resposta.json();

    const lista = document.getElementById('lista-admin');
    lista.innerHTML = '';

    produtos.forEach(produto => {
        lista.innerHTML += `
        <p>
        ${produto.nome} - R$ ${produto.preco.toFixed(2)}
        <button type="button" onclick="excluirProduto(${produto.id})">Excluir</button>
        <button type="button" onclick="editarProduto(${produto.id})">Editar</button>
        </p>
        `;
    });
}

async function excluirProduto(id){
    const certeza = confirm('Tem certeza que deseja excluir este produto?');
    if (!certeza) return;

    await fetch('/produtos/' + id, {method: 'DELETE'}); // '/produtos/' + id == '/produtos/id'
    await carregarLista();
}

async function editarProduto(id) {
    const resposta = await fetch('/produtos');
    const produtos = await resposta.json();
    const produto = produtos.find(p => p.id === id);

    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('descricao').value = produto.descricao || '';

    idEmEdicao = id;
    document.getElementById('botao-salvar').textContent = 'Salvar alterações';
}

carregarLista();