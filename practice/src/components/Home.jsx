import React,{useState} from 'react'
import { Modal,ModalBody,ModalHeader } from "reactstrap";


import '../styles/home.css';
import FormPage from './FormPage';
export default function Home() {
    const [Model, setOpenModal] = useState(false);

    const toggle = () => {
        setOpenModal(!Model);
    }

  return (
    <div>
        <div className='home'>
           <button className='button' onClick={toggle}>Go to form page</button>
         
           <Modal centered isOpen={Model} toggle={toggle} className='custom-modal' >
            <ModalHeader>
                <h2>users</h2>
            </ModalHeader>
                <ModalBody>
                  <FormPage toggle={toggle}/>
                </ModalBody>
           </Modal>
        </div>
    </div>
  )
}
