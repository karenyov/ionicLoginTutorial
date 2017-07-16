var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

/*importando as bibliotecas que instalamos*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/api/login', function(req, res){ // adicionando a rota onde ser� feita a chamada para nossa api
	var email = req.body.email; //recebendo as informa��es enviadas pelo usu�rio, no nosso caso � o email e a senha
	var password = req.body.password;
	
	if(email != 'teste@teste.com.br' || password != '123'){
		setTimeout(function(){
			res.send(401, {
				'error': {
					'http_code': 401,
					'code:' : 'anauthorized',
					'message': 'Login e/ou senha inv�lidos'
				}
			})
		},4000);
	} else {
		setTimeout(function(){
			res
				.header('Access-Control-Allow-Origin', '*')
				.send(200, {
					'data': {
						'name': 'Teste',
						'email': 'teste@teste.com.br',
						'token': 'este_e_o_token'
					}
				});
		},4000);
	}
});

app.listen(3000); // porta em que a api ficar� escutando
console.log('A API est� no ar');