const express = require ('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, ()=> {
    console.log('Site funcionando em http://localhost:3000');
});

