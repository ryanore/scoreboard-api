module.exports = {

  io: null,

  /**
   *  Init the Socket.io connection.
   *  Listen to client connections
   */
  init: function(server, next){
    if( this.io ) return;
    
    this.io = require('socket.io')({hearbeats: false}).listen(server);
   
    console.log('Websocket Connected');

    next();
  }


};
