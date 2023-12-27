import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import { createCategory } from '../api/services';


const ModalForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  let catName = useRef()
  let catImage = useRef()

  const toggleModal =()=>{
    setIsOpen(!isOpen)
  }
  
  const handleSubmit= ()=>{

    if(catName.current.value.length === 0 || catImage.current.files.length === 0){
      console.log("Must not be Empty")
    }
    else{
      let photo = catImage.current.files[0]
      let data = {"categoryName":catName.current.value, "categoryImg":photo }
      console.log(data)
      createCategory(data)
      catName.current.value = ''
      catImage.current.value = ''
    }
  }

  return (
    <>
      <Button className='px-4' variant='success' onClick={toggleModal}>
        New Category &#43;
      </Button>

      <Modal 
        show={isOpen} 
        onHide={toggleModal}
        centered={true}
      >
      <Modal.Header closeButton>
        <Modal.Title>Create a new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group className='mb-4'>
              <Form.Label>Category Name: </Form.Label>
              <Form.Control type="text" ref={catName} placeholder="category name eg. button" required/>           
          </Form.Group>
          <Form.Group >
              <Form.Label>Image: </Form.Label>
              <Form.Control type="file" ref={catImage} required/>
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
          </Button>
      </Modal.Footer>
    </Modal>
    
    </>
   
  );
};

export default ModalForm;