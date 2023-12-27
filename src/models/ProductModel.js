const mongoose =require('mongoose')

const productSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: {type:String},
  images: [String],
  manufacturer: {type:String}, 
  categoryId: {
    type:mongoose.Schema.ObjectId,
    ref:"CategoryModel",
    required:true
  },
},{
  timestamps:true,
  versionKey:false
})

const ProductModel = mongoose.model('products', productSchema)

module.exports = ProductModel;