//Iniciando o servidor HTTP + Socket.IO + FS
var app = require('http').createServer(index)
   ,io  = require('socket.io')(app)
   ,fs  = require('fs');

//Definindo a porta que o servidor HTTP ir� escutar
app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000.');
});

//Fun��o que devolver� a p�gina para o usu�rio
function index(req, res){
    fs.readFile(__dirname + '/index.html', function(err, data){
        res.writeHead(200);
        res.end(data);
    });
}

//Iniciando a configura��o do Socket.IO
var visitas = 0;

//Evento connection � executado quando a p�gina � chamada (usu�rio entra)
io.on('connection', function(socket){
    //Incrementa o total de visitantes online
    visitas++;

    //Atualiza para todos o total de visitantes online
    io.emit('visits', visitas);

    //Evento disconnect � executado quando a p�gina � fechada / reload (usu�rio sai)
    socket.on('disconnect', function(){
        visitas--;

        //Atualiza para todos o total de visitantes online
        io.emit('visits', visitas);
    });
});