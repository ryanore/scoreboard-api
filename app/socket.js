module.exports = {

  io: null,


  initClient: function(client){
    var _this = this;
    
    client.on('join_game', function (data) {
      console.log('joingame');
    });
  },
  
  /**
   *  Init the Socket.io connection.
   *  Listen to client connections
   */
  init: function(server){
    if( this.io ) return;
    
    this.io = require('socket.io')({hearbeats: false}).listen(server);
   
    console.log('Websocket Connected');

    this.io.on('connection', this.initClient.bind(this) );

    return this.io;
  }


};
