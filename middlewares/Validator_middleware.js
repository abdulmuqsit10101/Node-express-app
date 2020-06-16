// MiddleWare for users
module.exports = {
  validator: function (name){
    console.log('Validation started! happy hacking!, thing is being done by the person named as ' + name);
    return (req, res, next) => {
      console.log('Hello. first lets do validation.');
      if (req.params.username === 'Ali' || req.params.username === 'ali') {
        console.log('Authenticated Successfully!');
        next();
      } else {
        res.send('Page not found!');
      }
    }
  }
};
