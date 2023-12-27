import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const productId = useParams();
  const [product, setProduct] = useState()

  useEffect(()=>{
    // Make api request using productId and set to product
  },[])
  const image = 'https://lapco.co.nz/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/b/0bd238e8c636a6d22d904c3aad1eb29d8a95ca72_1.jpg'
  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <a className="rounded-4" data-type="image" href='/'>
                <img style={{maxWidth: "100%", maxHeight: "100vh", margin: "auto"}} className="rounded-4 fit" src={image} alt='images'/>
              </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <a className="border mx-1 rounded-2 item-thumb" data-type="image" href="#root">
                <img width="60" height="60" className="rounded-2" src={image} alt='Images'/>
              </a>
              <a className="border mx-1 rounded-2 item-thumb" data-type="image" href="#root">
                <img width="60" height="60" className="rounded-2" src={image} alt='images'/>
              </a>
              <a className="border mx-1 rounded-2 item-thumb" data-type="image" href="#root">
                <img width="60" height="60" className="rounded-2" src={image} alt='images'/>
              </a>

            </div>

          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
                FULL BELT BUCKLE 38MM (SATIN NICKEL) Center Bar 55 x 35mm Silver Color
              </h4>

              <div className="mb-3">
                <span className="h5">$75.00</span>
                <span className="text-muted">/per box</span>
              </div>

              <p>
              Hardware items are measured by internal diameter, with the measurement indicating what width strap or webbing they can accommodate (for our hardware straps are generally 2-4mm thick).
              </p>

              <div className="row">
                <dt className="col-3">Category:</dt>
                <dd className="col-9">Buckle</dd>

                <dt className="col-3">Color</dt>
                <dd className="col-9">Brown</dd>

                <dt className="col-3">Manufacturer</dt>
                <dd className="col-9">Hasan Metal</dd>

                <dt className="col-3">Brand</dt>
                <dd className="col-9">Reebook</dd>
              </div>

              <hr />

              <a href="/" className="btn btn-primary shadow-0 float-end px-4"> Edit </a>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;