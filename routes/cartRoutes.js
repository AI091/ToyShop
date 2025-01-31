const express = require('express');
const router = express.Router();

//import controllers
const cartController = require('../controllers/cartController');
const authMiddleWare=require('../middleware/auth')

/* define routes */
router.get('/',authMiddleWare, cartController.getItems);
router.post('/add-item',authMiddleWare, cartController.addItem);
router.post('/delete-item',authMiddleWare, cartController.deleteItem);
router.post('/update-quantity',authMiddleWare, cartController.updateQuantity);
router.post('/place-order',authMiddleWare, cartController.placeOrder);
router.delete('/clear-cart',authMiddleWare, cartController.clearCart)
// define route to catch the items under which brand
// router.get('/brand/:brand', itemsController.getItemsByBrand);

// router.get('/search', itemsController.search);


module.exports = router;
    

