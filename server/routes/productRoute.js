const { Router } = require('express');
const productController = require('../controller/productController');
const authMiddleware = require('../middleware/authMiddleware');
const permissions = require('../permissions/Product')

const router = Router();
router.post('/create_product',authMiddleware.checkUser,permissions.canCreateProduct,productController.createProduct);


module.exports = router;