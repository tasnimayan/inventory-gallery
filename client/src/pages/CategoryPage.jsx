import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import ModalForm from "../components/ModalForm";
import { getAllCategory } from "../api/services";

const CategoryPage = () => {
  const [categories, setCategories] = useState([])
  let loader = useRef()
  useEffect(()=>{
    
    loader.current.classList.remove('d-none')
    getAllCategory()
      .then((response) => {
        loader.current.classList.add('d-none')
        setCategories(response.data["data"])
      }).catch((err)=>{
        console.log(err)
      })
  }, [])
  
  return (
    <section>
      <div className="">
        <p className="fs-2 fw-bold lh-1 d-inline-block">All Categories</p>
        <div className="float-end d-inline-block">
          <ModalForm />
        </div>
      </div>
      <div className="row py-5 g-4 m-0">
        {
          categories?.map((item, index) => <CategoryCard category={item} key={index}/>)
        }
      </div>

      <div className="d-none" ref={loader}>
        <Loader />
      </div>
    </section>
  );
};

export default CategoryPage;