import React from 'react';

const CategoryCard = ({category}) => {

  return (
    <div className="col-6 col-md-4 col-lg-2 text-center">
      <a href={`/category/${category._id}`} className="text-decoration-none text-black">
        <div className="rounded-4 shadow ">
          <div className="position-relative border-bottom ">
            <img src={category.categoryImg} alt="" width={"100%"} height={"140px"} className="rounded-top-4 object-fit-cover"/>
          </div>
          <p className='fs-6 fw-semibold py-2'>{category.categoryName}</p>
        </div>
      </a>
    </div>
  );
};

export default CategoryCard;