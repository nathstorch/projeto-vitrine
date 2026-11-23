//pega o que for digitado e entrega ao servidor

const formulario = document.getElementById('form-produto');

formulario.addEventListener('submit', async (evento) => {
  console.log('Alguém clicou!');


//formulario.add.EventListener('submit', async (evento) => { //vamos usar await (esperar o servidor responder). Sem o async, o await dá erro.
//    evento.preventDefault();           // função sem nome pq só vai ser usado aqui

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
    alert('Produto adicionado'); // depois trocar
});