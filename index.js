var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(process.env.PORT || 3000, function(){
    console.log('listening on '+process.env.PORT || 3000);
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
       // io.emit('chat message', msg);
        socket.broadcast.emit('chat message', msg);
    });
});

io.on('connection',function(socket){
    io.emit('chat message', "user connected");

    socket.on('disconnect', function(){
        io.emit('chat message',"user disconnected");
    });

});

io.on('connection', function(socket){
    socket.on('is typing', function(user_name){
        console.log('typing: ' + user_name);
        socket.broadcast.emit('is typing', user_name);
    });
});

io.on('connection', function(socket){
    socket.on('no longer typing', function(user_name){
        console.log('not typing: ' + user_name);
        socket.broadcast.emit('no longer typing', user_name);
    });
});


