const express = require ('express'); // cria a variavel para carregar o Express, que instalei com npm install express
const app = express(); // cria a variavel para o meu servidor

app.use(express.json()); // ajudano servidor a entender dados enviados pela página
app.use(express.static('public')); //para a página, procure os arquivos dentro da pasta "public"

//lista produtos está por enquanto na memória e guarda os itens
let produtos = []; //let permite que a lista sofra alterações depois
let proximoId = 1;

// devolve os produtos quando alguem pede a lista
app.get('/produtos', (req, res) => { //"regra para quando alguém pede para ver algo" // req (request -> dados que o form mandou) e res (response -> o que vai ser devolvido para a pag)
    res.json(produtos);
});

app.delete('/produtos/:id', (req, res) =>{ //busca o produto pelo id que vai ser substituido pelo numero que for digitado para ser apagado
    const id = Number(req.params.id); //"Number" transforma o id em um numero de verdade
    produtos = produtos.filter(produto => produto.id !== id); //Filter serve como uma peneira para todos os ids que forem diferentes do id que vai ser apagado
    res.status(204).end(); // servidor mostra que deu tudo certo
});

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const {nome, preco, descricao } = req.body;

    const produto = produtos.find(p => p.id === id); // "===" serve para comparação, true or false
    if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado'});
    }

    produto.nome = nome;
    produto.preco = Number(preco);
    produto.descricao = descricao;

    res.json(produto);

    });

app.post ('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body; // crie caixinhas chamadas nome, preco e descricao e coloque nelas o que está nas etiquetas nome, preco e descricao da caixa req.body
    const produto = { id: proximoId++, nome, preco: Number(preco), descricao }; // dá um número único ao produto, necessario para editar e excluir depois // "Number(preco) transforma o texto em um numero de verdade podendo fazer contas
    produtos.push(produto); // Aqui o produto novo entra na lista produtos que criamos no começo do arquivo. É aqui que ele realmente fica guardado (por enquanto, só na memória).
    res.status(201).json(produto); // 201 codigo de sucesso // .json(produto) devolve a ficha pronta
});

app.listen(3000, ()=> { //escutando pedidos na porta 3000
    console.log('Site funcionando em http://localhost:3000'); //"abre a loja e fica atendendo"
});

