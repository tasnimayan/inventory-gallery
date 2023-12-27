
const ProductCard = ({product}) => {
  return (
    <div className="col-md-4 col-lg-3 text-center">
      <a href={`/products/${product._id}`} className="text-decoration-none text-black">
        <div className="rounded-4 shadow pb-2 border border-2">
          <div className="position-relative border-bottom border-2">
            <img src={product.images[0]?product.images[0]:'/placeholder.jpg'} alt="" width={"100%"} height={"240px"} className="rounded-top-4 object-fit-cover"/>
          </div>
          <p className='fs-6 fw-semibold mt-3 px-2' style={{minHeight:"50px"}}>{product.title}</p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;