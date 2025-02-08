const mongoose=require('mongoose');
const Product=require('../product/index.js');

const categorySchema=mongoose.Schema({
  name:String,
  products:[{ type: mongoose.Schema.Types.ObjectId,ref:'Product'}]
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema);