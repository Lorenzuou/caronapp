
module.exports = app => {
    const controller = require('../controllers/exemploController')();
  
    app.route('/api/v1/minha-rota')
      .get(controller.listCustomerWallets);







      
  }