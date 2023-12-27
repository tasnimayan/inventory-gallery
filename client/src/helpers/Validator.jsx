import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

class validator {
  isEmpty(value){
    if(value.length === 0){
      return true;
    }
    else{
      return false;
    }
  }

  successToast(){
    toast('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  errorToast(){
    toast("Wrong Something happened");
  }

}

export const {isEmpty, successToast, errorToast} = new validator();