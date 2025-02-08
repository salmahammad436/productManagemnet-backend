const router=require('express').Router()
const { validateProduct } = require('../../middelware/validation/product/createProduct');
const {validateProductUpdate}= require('../../middelware/validation/product/updateProduct');
const  { getAllProducts,getProductById,createNewProduct,updateProduct,deleteProduct } =require('../../controller/products') ;
const { authorize}= require('../../middelware/Authorization/index.js');
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.post('/', validateProduct,createNewProduct)
router.put('/:id', authorize,validateProductUpdate,updateProduct)
router.delete('/:id', authorize,deleteProduct)

module.exports=router;

