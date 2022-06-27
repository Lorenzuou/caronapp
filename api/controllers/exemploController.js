
module.exports = () => {
    const exemploDB = require('../data/dados.json');
    const controller = {};
  
    controller.listCustomerWallets = (req, res) => res.status(200).json(exemploDB);
  
    return controller;
  }