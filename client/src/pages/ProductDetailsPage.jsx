import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DeleteProduct, getProductDetails } from '../api/services';
import UpdateForm from '../components/UpdateForm';

const ProductDetailsPage = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState({_id:'', title:'', description:'',categoryId:'',status:'',manufacturer:'',images:[]})

  useEffect(()=>{
    getProductDetails(productId)
    .then((response) => {
      setProduct(response.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const getProduct = ()=>{
    return product
  }

  const DeleteItem =(productId)=>{
    DeleteProduct(productId)
      .then((response)=>{
        console.log("successful")
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center" style={{height:"400px"}}>
              <img style={{maxWidth: "100%", maxHeight: "100%", }} className="rounded-4 object-fit-cover" src={product.images[0]?product.images[0]:'/placeholder.jpg'} alt='images'/>
            </div>
            <div className="d-flex justify-content-center mb-3">
              {product.images.map((img, index)=>{
                return(
                  <a className="border mx-1 rounded-2 item-thumb" data-type="image" href="#root" key={index}>
                    <img width="60" height="60" className="rounded-2" src={img} alt='Images'/>
                  </a>)
              })}
            </div>

          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
               {product.title}
              </h4>

              <div className="mb-3">
                <span className="h5">$75.00</span>
                <span className="text-muted">/per box</span>
              </div>

              <p>
                {product.description}
              </p>

              <div className="row">
                <dt className="col-3">Category:</dt>
                <dd className="col-9">{product.categoryId?.categoryName}</dd>

                <dt className="col-3">Color</dt>
                <dd className="col-9">Brown</dd>

                <dt className="col-3">Manufacturer</dt>
                <dd className="col-9">{product.manufacturer}</dd>
              </div>

              <hr />

              <button className="btn btn-danger shadow-0 float-end px-4 ms-2" onClick={DeleteItem.bind(this, product._id)}> Delete </button>

              <UpdateForm getProduct={getProduct}/>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;