var app  = require('express')()
   ,http = require('http').Server(app);

app.get('/', function(req, res){
    res.send('<h1>Hello World!</h1>');
});

http.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});