
//the server side 

module.exports.chatSockets = function(socketServer){
    
    let io = require('socket.io').listen(socketServer);

    io.sockets.on('connection', function(socket){
        // console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            // console.log('socket disconnected!');
        });

        
        socket.on('join_room',function(data){
            // console.log('joining request recieved',data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            // console.log('message recieved',data);
            io.in(data.chatroom).emit('recieve_message',data);
        });
        
        

    });

}
