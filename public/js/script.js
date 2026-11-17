async function carregarProdutos (){ //função que carrega a resposta do servidor, algo demorado
    const resposta = await fetch('/produtos'); //"fetch" pede ao navegador que ele entregue o que está no endereço /produtos e o "await" pede para esperar até a resposta chegar antes de passar para a prox linha
    const produtos = await resposta.json(); // json converte o valor da variavel resposta em uma lista que o JS entende com cada produto (id, nome e preço)

    const lista = document.getElementById('lista-produtos'); //o elemento com o id "lista-produtos" vai ser procurado dentro do documento e guardado na variavel "lista"
    lista.innerHTML = ''; // "innerHTML" é o que existe dentro do elemento, colocando vazio a grade é limpa

   produtos.forEach((produto, i) => { //pedindo para aplicar essa função em cada item da lista, produto é o item atual e i é a posição dele
       const cor = i % 2 === 0 ? 'card--rosado' : 'card--verde'; // intercala as cores entre as posições
       lista.innerHTML += `
         <a href="#" class="card ${cor}">
           <div class="card__imagem"></div>
           <span class="card__nome">${produto.nome}</span>
         </a>
       `; // criando um card dentro da grade, o "+=" diz para acrescentar ao que ja existe sem alterar o resto, "${...}" são espaços que o JS preenche com valores de variáveis
     });
}

carregarProdutos(); //função é definida executando os comandos no site
