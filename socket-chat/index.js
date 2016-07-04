var app  = require('express')()
   ,http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});