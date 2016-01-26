var User = require('../models/userModel').model;

module.exports = function(){
  
  User.findOne(function(err,usr){
    
    if( !usr ){
      
      // Create a super admin.  It's up to you to delete this user later
      
      var admin = new User({
        'username':'firstAdmin',
        'firstName':'Admin',
        'lastName':'Admin',
        'email':'admin@example.com',
        'role':'admin',
        'password': 'iamanadmin',
        'access': 1
      });
      
      admin.save(function(err){
        if(!err){
          console.log('User Created:: ');
          console.log(usr);
        }  
      });
      
    }
  });
};