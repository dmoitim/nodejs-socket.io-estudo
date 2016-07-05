//Iniciando o servidor HTTP + Express + Socket.IO
var app  = require('express')()
   ,http = require('http').Server(app)
   ,io   = require('socket.io')(http);

//Função que devolverá a página para o usuário
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Evento connection é executado quando a página é chamada (usuário entra)
io.on('connection', function(socket){
    console.log('Um usuário se conectou');

    //Atualiza para todos a mensagem enviada
    socket.on('chat', function(msg){
        console.log('mensagem: ' + msg)
        io.emit('chat', msg);
    });

    //Evento disconnect é executado quando a página é fechada / reload (usuário sai)
    socket.on('disconnect', function() {
        console.log('Um usuário se desconectou');
    });
});

//Definindo a porta que o servidor HTTP irá escutar
http.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});