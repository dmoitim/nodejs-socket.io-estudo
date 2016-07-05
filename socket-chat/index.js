//Iniciando o servidor HTTP + Express + Socket.IO
var app  = require('express')()
   ,http = require('http').Server(app)
   ,io   = require('socket.io')(http);

//Fun��o que devolver� a p�gina para o usu�rio
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Evento connection � executado quando a p�gina � chamada (usu�rio entra)
io.on('connection', function(socket){
    console.log('Um usu�rio se conectou');

    //Atualiza para todos a mensagem enviada
    socket.on('chat', function(msg){
        console.log('mensagem: ' + msg)
        io.emit('chat', msg);
    });

    //Evento disconnect � executado quando a p�gina � fechada / reload (usu�rio sai)
    socket.on('disconnect', function() {
        console.log('Um usu�rio se desconectou');
    });
});

//Definindo a porta que o servidor HTTP ir� escutar
http.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});