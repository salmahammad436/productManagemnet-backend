const router=require('express').Router()
const {Register,login}= require('../../controller/Auth/index')
const { validateUser } = require('../../middelware/validation/user/index');

router.post('/register',validateUser,Register);
router.post('/login',login);


module.exports=router;