const router=require('express').Router()
const { validateCategory } = require('../../middelware/validation/category/index.js');
const { createNewCategory,getCategoryById } =require('../../controller/category/index') ;

router.get('/:id',getCategoryById);
router.post('/',validateCategory,createNewCategory);


module.exports=router;