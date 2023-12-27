import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { getAllCategory, updateProduct } from '../api/services';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UpdateForm = ({getProduct}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({title:'', description:'',categoryId:'',status:'',manufacturer:'',photos:[]})
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    getAllCategory()
      .then((response) => {
        setCategories(response.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }, [])

  const toggleModal =()=>{
    const data = (getProduct())
    setProduct({...product, _id:data._id, title:data.title,description:data.description, manufacturer:data.manufacturer})
    setIsOpen(!isOpen)
  }
  
  const handleSubmit =async (e)=>{
    e.preventDefault()
    if(product.title === '' || product.categoryId === ''){
      toast.error('Title or Category can\'t be empty')
    }
    else{
      const updateData = new FormData()
      updateData.append('title', product.title)
      updateData.append('description', product.description)
      updateData.append('categoryId', product.categoryId)
      updateData.append('status', product.status)
      updateData.append('manufacturer', product.manufacturer)

      for(let i = 0; i<product.photos.length ; i++){
        updateData.append('photos', product.photos[i])
      }

      try {
        const response = await updateProduct(product._id, updateData);
        toast.success(response.data.message);
        setIsOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <button className="btn btn-primary shadow-0 float-end px-4 ms-2" onClick={toggleModal}> Edit </button>
      <Modal 
        show={isOpen} 
        onHide={toggleModal}
        centered={true}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title >Update Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" p-5 bg-white border rounded-4 shadow">
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
                      <textarea rows="4" cols="5" name="description" className="form-control" onChange={(e)=> setProduct({...product, description:e.target.value})} value={product.description}></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                    <div className="row lh-1">
                        <label className="col-md-3 fs-6 fw-semibold">Category :</label>
                        <div className="col-md-9">
                            <select className="form-select form-custom" name="category" required onChange={(e)=> setProduct({...product, categoryId:e.target.value})} value={product.categoryId} >
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
                      <select className="form-select form-custom" name="status" onChange={(e)=> setProduct({...product, status:e.target.value})} value={product.status}>
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
                      <input className="form-control" placeholder="Name of Manufacturer" onChange={(e)=> setProduct({...product, manufacturer:e.target.value})} value={product.manufacturer}/>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="row lh-1">
                    <label className="col-md-3 fs-6 fw-semibold">Image :</label>
                    <div className="col-md-9">
                      <input className="form-control" 
                        name="photos" 
                        type="file" multiple required 
                        onChange={(e)=> setProduct({...product, photos:e.target.files})}/>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-5">
                  <input className="btn btn-primary px-5" type="submit" onClick={(e)=>handleSubmit(e)}/>
                </div>

              </form>
          </div>
        </Modal.Body>
      </Modal>
    
    </>
   
  );
};

export default UpdateForm;