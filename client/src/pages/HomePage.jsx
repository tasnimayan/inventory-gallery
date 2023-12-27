import {useState, useRef, useEffect} from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/services';
import Loader from '../components/Loader';

const HomePage = () => {
  const [products, setProducts] = useState([])
  let loading = useRef()
  useEffect(()=>{
    loading.current.classList.remove('d-none')
    getAllProducts()
      .then((response) => {
        loading.current.classList.add('d-none')
        setProducts(response.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
  return (
    <section>
      <div>
        <p className="fs-2 fw-bold lh-1">All Products</p>
      </div>
      <div className="d-none" ref={loading}>
        <Loader />
      </div>
      <div className="row py-5 g-4 m-0">
        {
          products.map((product, index) => <ProductCard product={product}key={index}/>)
        }
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="/" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="/">1</a></li>
          <li className="page-item"><a className="page-link" href="/">2</a></li>
          <li className="page-item"><a className="page-link" href="/">3</a></li>
          <li className="page-item">
            <a className="page-link" href="/">Next</a>
          </li>
        </ul>
      </nav>

    </section>
  );
};

export default HomePage;