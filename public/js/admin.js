//pega o que for digitado e entrega ao servidor

const formulario = document.getElementById('form-produto');

formulario.addEventListener('submit', async (evento) => { //vamos usar await (esperar o servidor responder). Sem o async, o await dá erro.
    evento.preventDefault(); // função sem nome pq só vai ser usado aqui
    console.log('Alguém clicou!');

    const dados = {
        nome: document.getElementById('nome').value,
        preco: document.getElementById('preco').value,
        descricao: document.getElementById('descricao').value
    };

    await fetch('/produtos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    formulario.reset(); // o reset limpa os campos para que um novo produto possa ser add
    await carregarLista();
    alert('Produto adicionado');
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

carregarLista();