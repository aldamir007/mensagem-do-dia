
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const resposta = await axios.get(
            'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
        );

        const mensagem = resposta.data[0];

        res.render('index', {
            mensagem: mensagem,
            erro: ''
        });
    } catch (error) {
        console.error('Erro ao buscar mensagem:', error.message);

        res.status(502).render('index', {
            mensagem: '',
            erro: 'Não foi possível carregar a mensagem. Tente novamente.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
