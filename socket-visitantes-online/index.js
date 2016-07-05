//Iniciando o servidor HTTP + Socket.IO + FS
var app = require('http').createServer(index)
   ,io  = require('socket.io')(app)
   ,fs  = require('fs');

//Definindo a porta que o servidor HTTP irá escutar
app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000.');
});

//Função que devolverá a página para o usuário
function index(req, res){
    fs.readFile(__dirname + '/index.html', function(err, data){
        res.writeHead(200);
        res.end(data);
    });
}

//Iniciando a configuração do Socket.IO
var visitas = 0;

//Evento connection é executado quando a página é chamada (usuário entra)
io.on('connection', function(socket){
    //Incrementa o total de visitantes online
    visitas++;

    //Atualiza para todos o total de visitantes online
    io.emit('visits', visitas);

    //Evento disconnect é executado quando a página é fechada / reload (usuário sai)
    socket.on('disconnect', function(){
        visitas--;

        //Atualiza para todos o total de visitantes online
        io.emit('visits', visitas);
    });
});