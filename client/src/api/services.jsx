  // // Default options are marked with *
  // const response = await fetch(url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   mode: "cors", // no-cors, *cors, same-origin
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(data), // body data type must match "Content-Type" header
  // });
  // return response.json();

import axios from 'axios'
// Complete
export  async function getAllProducts(){
  let URL = '/api/products'  // get

  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  
}

export  async function getProductDetails(productId){
  let URL = 'api/products/'+productId  //get

  try{
    const response = await fetch(URL, {
      method: "GET",
      mode: " same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    return response.json();
  }
  catch(err){
    console.log(err)
    return err.message
  }
}

export  async function createProduct(product){
  let URL = '/api/products'   //post

  try {
    const response = await axios.post(URL, product,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

}

export  async function updateProduct(productId, updatedData){
  let URL = '/api/products/'+productId  // post

  try{
    const response = await fetch(URL, {
      method: "POST",
      mode: " same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData)

    });
    return response.json();
  }
  catch(err){
    console.log(err)
    return err.message
  }
}

export  async function DeleteProduct(productId){
  let URL = 'api/products/'+productId  //delete
  try{
    const response = await fetch(URL, {
      method: "DELETE",
      mode: " same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    return response.json();
  }
  catch(err){
    console.log(err)
    return err.message
  }
}

// Complete
export  async function getAllCategory(){
  let URL = '/api/category'  // get

  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  
}

// Complete
export  async function createCategory(category){
  let URL = '/api/category'  // post

  axios.post(URL, category, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    return response
  }).catch((err)=>{
    console.log(err)
    return null;
  })
  
}

export  async function getByCategory(categoryId){
  let URL = '/api/category/'+categoryId  // get
    
  try{
    const response = await fetch(URL, {
      method: "GET",
      mode: " same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return response.json();
  }
  catch(err){
    console.log(err)
    return err.message
  }
}


