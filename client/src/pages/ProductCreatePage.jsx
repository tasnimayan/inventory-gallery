import { useState, useEffect } from "react";
import { createProduct, getAllCategory } from "../api/services";

const ProductCreatePage = (props) => {
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({title:'', description:'',categoryId:'',status:'',manufacturer:'',photos:[]})

  // Fetching the categories for drop down 
  useEffect(()=>{
    getAllCategory()
      .then((response) => {
        setCategories(response.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
  
  const data = new FormData()
// On submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    data.append('title', product.title)
    data.append('description', product.description)
    data.append('categoryId', product.categoryId)
    data.append('status', product.status)
    data.append('manufacturer', product.manufacturer)
    data.append('photos',product.photos[0])
    
    // for(let i = 0; i<product.photos.length ; i++){
    //   data.append(`photos${i}`,product.photos[i])
    // }

    const response = await createProduct(data)
    console.log(response)
    // props.history.push('/')
  }
  return (
    <section>
      <div>
        <p className="fs-2 fw-bold lh-1">Create A Product </p>
      </div>
      <div className="d-flex flex-column align-items-center py-5">
        <div className="col-md-7 p-5 bg-white border rounded-4 shadow">
          <form className="form-horizontal" >
            <div className="form-group mb-4">
              <div className="row lh-1">
                <label className="col-md-3 fs-6 fw-semibold">Title :</label>
                <div className="col-md-9">
                  <input className="form-control" name="name" type="text" required onChange={(e)=> setProduct({...product, title:e.target.value})} value={product.title}/>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="row lh-1">
                <label className="col-md-3 fs-6 fw-semibold">Description :</label>
                <div className="col-md-9">
                  <textarea rows="4" cols="5" name="description" className="form-control" onChange={(e)=> setProduct({...product, description:e.target.value})}></textarea>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
                <div className="row lh-1">
                    <label className="col-md-3 fs-6 fw-semibold">Category :</label>
                    <div className="col-md-9">
                        <select className="form-select form-custom" name="category" required onChange={(e)=> setProduct({...product, categoryId:e.target.value})}>
                            <option value="">Select Category</option>
                            {categories.map((item, index)=> <option value={item._id} key={index}>{item.categoryName}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="form-group mb-4">
              <div className="row lh-1">
                <label className="col-md-3 fs-6 fw-semibold">Status :</label>
                <div className="col-md-9">
                  <select className="form-select form-custom" name="status" onChange={(e)=> setProduct({...product, status:e.target.value})}>
                    <option value="">Please Select</option>
                    <option value="status1">In Stock</option>
                    <option value="status2">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group custom-autocomplete mb-4">
              <div className="row lh-1">
                <label className="col-md-3 fs-6 fw-semibold">Manufacturer :</label>
                <div className="col-md-9">
                  <input className="form-control" placeholder="Name of Manufacturer" onChange={(e)=> setProduct({...product, manufacturer:e.target.value})}/>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="row lh-1">
                <label className="col-md-3 fs-6 fw-semibold">Image :</label>
                <div className="col-md-9">
                  <input className="form-control" name="photos" type="file" multiple required onChange={(e)=> setProduct({...product, photos:e.target.files})}/>
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <input className="btn btn-primary px-5" type="submit" multiple required onClick={(e)=>handleSubmit(e)}/>
            </div>

          </form>
        </div>
    </div>
    </section>
  );
};

export default ProductCreatePage;