const ProductModel = require('../models/ProductModel')
const mongoose = require('mongoose')


exports.Pagination = async (req, res, next) =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage_price';
  req.query.fields = 'name_price_ratingsAverage_duration_difficulty_summary';
  next();
}

// Get all products
exports.getAllProducts = async (req, res)=> {
  try {
    const products = await ProductModel.find();

    if (products.length === 0) {
      return res.status(404).send({ message:"No products found", data:[] });
    }
    res.status(200).send({ message:"Products List", data:products });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Creating New product
exports.createProduct = async (req, res) => {
  let photos;
  console.log(req.body)
  console.log(req.files)

  if(req.files){
    photos = req.files.map(item => item.path.replace(/\\/g,'/').slice(6));
  }
  try {
    const categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    const product = await ProductModel.create({
      title: req.body.title,
      description: req.body.description,
      images: photos,
      manufacturer: req.body.manufacturer,
      categoryId: categoryId
    });

    if (!product) {
      return res.status(400).send({ message:"Could not create product" });
    }

    res.status(200).send({ message: 'Product created successfully!', data:product });
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
}

// Get Tour details with specific TourID
exports.getProductDetails = async (req, res)=>{
  try {
    const product = await ProductModel.findById(req.params.productId).populate({path: 'category',select: '-createdAt -updatedAt -_id'});

    if (!product) {
      return res.status(404).send({ message: 'No data found', data:{}});
    }
    res.status(200).send({message:"Data found", data:product});
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Update product
exports.updateProduct = async (req, res) =>{
  try {
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    let photos;
    if(req.files){
      photos = req.files.map(item => item.path.replace(/\\/g,'/').slice(6));
    }

    const updateFields = ["title", "description", "category", "status", "manufacturer"]  

    const product = await ProductModel.findOne({_id:productId});
    
    if (!product) {
      return res.status(404).send({ message: 'No data found', data:{}});
    }
    
    for(key in req.body){
      if(updateFields.includes(key)){
        product[key] = req.body.key;
      }
    }

    product.images = photos? photos: product.images
    await product.save();

    res.status(200).send({ message: 'Product updated!', data:product });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Deleting product
exports.deleteProduct = async (req, res) =>{
  try {
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    const product = await ProductModel.deleteOne({_id:productId});

    if (!product) {
      return res.status(404).send({message:"Couldn't delete product"});
    }
    res.status(200).send({message:"Deleted successfully"});
  } catch (err) {
    res.status(400).send(err.message);
  }
}

exports.getByCategory = async (req, res) =>{
  try{
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);

    const products = await ProductModel.find({categoryId:categoryId});
    if (!products) {
      return res.status(404).send({message:"Couldn't find product"});
    }
    res.status(200).send({ message: 'Product List by Category!', data:products });
  }
  catch(err){
    res.status(400).send(err.message);
  }
}


exports.getQueriedTours = async (req, res) => {
  const queryString = { ...req.query };

  // exclude everything other than match field -> later chain methods on found document
  ['page', 'sort', 'limit', 'fields', 'skip'].forEach(
    el => delete queryString[el]
  );

  //regEx filtering with >, =>, <, =<
  let match = JSON.stringify(queryString);
  match = match.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

  try{
    //get the matched documents from db
    let QUERIES = Tour.find(JSON.parse(match));

    // Chain  methods


    const sort = req.query.sort || {};

    //* PAGINATION

    const PAGE_SIZE = 5;
    const page = req.query.page || 1;
    const limit = req.query.limit || PAGE_SIZE;
    const skip = (page - 1) * PAGE_SIZE || 0;

    //resolve the promise and finish query
    const result = await QUERIES.skip(skip).limit(limit).sort(sort);

    if (result.length === 0) {
      return res.status(200).send({ message: 'No results match this query' });
    }
    res.status(200).send({ results: tours.length, result });

  } catch (err) {
    res.status(400).send(err.message);
  }
}


