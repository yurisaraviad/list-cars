import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


//import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, input type="text" } from '@mui/material';
import {Edit,Delete,Visibility} from "@mui/icons-material"
import { ModalBody } from 'react-bootstrap';
//import { input type="text" } from '@mui/material';



const baseUrl='http://localhost:3001/cars/'






function App() {

  const [data, setData]=useState([]);

  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modalVer, setModalVer]=useState(false);



  const [carsSeleccionada, setcarsSeleccionada]=useState({
    marca: '',
    modelo: '',
    year: '',
    cilindrada: '',
    procedencia: '',
    precio: '',
    pic1:'',
    pic2: ''
  })


  const handleChange=e=>{
    const {name, value}=e.target;
    setcarsSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(carsSeleccionada);
  }


   const peticionGet=async()=>{
     await axios.get(baseUrl)
     .then(response=>{
       setData(response.data);
     })
   }


   const peticionPost=async()=>{
    await axios.post(baseUrl, carsSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
   }

   const peticionPut=async()=>{
    await axios.put(baseUrl+carsSeleccionada.id, carsSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(cars=>{
        if(carsSeleccionada.id===cars.id){
          cars.marca=carsSeleccionada.marca;
          cars.modelo=carsSeleccionada.modelo;
          cars.year=carsSeleccionada.year;
          cars.cilindrada=carsSeleccionada.cilindrada;
          cars.procedencia=carsSeleccionada.procedencia;
          cars.precio=carsSeleccionada.precio;
          cars.pic1=carsSeleccionada.pic1;
          cars.pic2=carsSeleccionada.pic2;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
   }


   const peticionDelete=async()=>{
    await axios.delete(baseUrl+carsSeleccionada.id)
    .then(response=>{
      setData(data.filter(cars=>cars.id!==carsSeleccionada.id));
      abrirCerrarModalEliminar();
    })
   }


   const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
   }

   const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
   }


   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
   }

   const abrirCerrarModalVer=()=>{
    setModalVer(!modalVer);
   }




   const seleccionarcars=(cars,caso)=>{
    setcarsSeleccionada(cars);
    if (caso==='Editar'){
      abrirCerrarModalEditar();
    }
    else{
      if(caso=='Ver'){
        abrirCerrarModalVer();
      }
      else{
        abrirCerrarModalEliminar();
      }

    }
   
   }




   useEffect(()=>{
     peticionGet();

   })


  const bodyInsertar=(
           
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Carro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Marca</span>            
      <input type="text" placeholder="Marca" name="marca" className='form-control' label="Marca" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Modelo</span> 
      <input type="text" placeholder="Modelo" name="modelo" className='form-control' label="Modelo" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Year</span> 
      <input type="text" placeholder="Year" name="year" className='form-control' label="Year" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Cilindrada</span> 
      <input type="text" placeholder="Cilindrada" name="cilindrada" className='form-control' label="Cilindrada" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Procedencia</span> 
      <input type="text" placeholder="Procedencia" name="procedencia" className='form-control' label="Procedencia" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Precio</span> 
      <input type="text" placeholder="Precio" name="precio" className='form-control' label="Precio" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Pic1</span> 
      <input type="text" placeholder="Pic1" name="pic1" className='form-control' label="Pic1" onChange={handleChange}/>
      </div>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Pic2</span> 
      <input type="text" placeholder="Pic2" name="pic2" className='form-control' label="Pic2" onChange={handleChange}/>
      </div>
      </Modal.Body>        

      <Modal.Footer>
          <Button variant="success" onClick={()=>peticionPost()}>
            Insertar
          </Button>
          <Button variant="secondary" onClick={()=>abrirCerrarModalInsertar()}>
            Cancelar
          </Button>
          
      </Modal.Footer>

    </div>
    
  )

  const bodyEditar=(
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Editar Carro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="input-group mb-3">  
      <span class="input-group-text" id="basic-addon1">Marca</span>     
      <input type="text" name="marca" className='form-control' label="Marca" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.marca}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Modelo</span>  
      <input type="text"  name="modelo" className='form-control' label="Modelo" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.modelo}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Year</span> 
      <input type="text"  name="year" className='form-control' label="Year" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.year}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Cilindrada</span>      
      <input type="text"  name="cilindrada" className='form-control' label="Cilindrada" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.cilindrada}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Procedencia</span> 
      <input type="text" name="procedencia" className='form-control' label="Procedencia" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.procedencia}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Modelo</span>
      <input type="text" name="precio" className='form-control' label="Precio" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.precio}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Modelo</span>
      <input type="text"  name="pic1" className='form-control' label="Pic1" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.pic1}/>
      </div>
      <div class="input-group mb-3"> 
      <span class="input-group-text" id="basic-addon1">Modelo</span> 
      <input type="text"  name="pic2" className='form-control' label="Pic2" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.pic2}/>
      </div>
      </Modal.Body>  
          
           
      
      <Modal.Footer>
          <Button variant="success" onClick={()=>peticionPut()}>
            Editar
          </Button>
          <Button variant="secondary" onClick={()=>abrirCerrarModalEditar()}>
            Cancelar
          </Button>
          
      </Modal.Footer>
      

    </div>
  )
  

  const bodyEliminar=(
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Carro</Modal.Title>
      </Modal.Header>
      <ModalBody>
      <p>Estas seguro que deseas eliminar el carro <b>{carsSeleccionada && carsSeleccionada.modelo}</b> ?</p>
      </ModalBody>
      <Modal.Footer>      
        <Button variant="danger" onClick={()=>peticionDelete()}>
            Elminar
        </Button>
        <Button variant="secondary" onClick={()=>abrirCerrarModalEliminar()}>
            Cancelar
        </Button>
      </Modal.Footer>
      

    </div>
  )

  const bodyVer=(
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Ver Carro</Modal.Title>
      </Modal.Header>
      <ModalBody>        
      <table class="table table-bordered">
          <thead class="table-primary">
            <tr >
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Year</th>
              <th scope="col">Cilindrada</th>
              <th scope="col">Procedencia</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody class="table-secondary">
            <tr >
            <td>{carsSeleccionada.marca}</td>
            <td>{carsSeleccionada.modelo}</td>
            <td>{carsSeleccionada.year}</td>
            <td>{carsSeleccionada.cilindrada}</td>
            <td>{carsSeleccionada.procedencia}</td>
            <td>{carsSeleccionada.precio}</td>
            </tr>
            <tr>
              Carrousel
            </tr>
          </tbody>
      </table>
      </ModalBody>
      <Modal.Footer>      
        <Button variant="secondary" onClick={()=>abrirCerrarModalVer()}>
            Cancelar
        </Button>
      </Modal.Footer>
    </div>
  )
  








  return (
    <div className="App">
      <br />
 
      <Button variant="primary" onClick={()=>abrirCerrarModalInsertar()}>
        Insertar
      </Button>

      

      <table class="table table-bordered">
          <thead class="table-primary">
            <tr >
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Year</th>
              <th scope="col">Cilindrada</th>
              <th scope="col">Procedencia</th>
              <th scope="col">Precio</th>
              <th scope="col">Pic1</th>
              <th scope="col">Pic2</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody class="table-secondary">{data.map(cars=>(

            <tr key={cars.id}>
                <td scope="row">{cars.marca}</td>
                <td>{cars.modelo}</td>
                <td>{cars.year}</td>
                <td>{cars.cilindrada}</td>
                <td>{cars.procedencia}</td>
                <td>{cars.precio}</td>
                <td>{cars.pic1}</td>
                <td>{cars.pic2}</td>
                <td><Edit className="iconos" onClick={()=>seleccionarcars(cars,'Editar')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete className="iconos" onClick={()=>seleccionarcars(cars,'Eliminar')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Visibility className="iconos" onClick={()=>seleccionarcars(cars,'Ver')}/>
                </td>
            </tr>
            ))}
          </tbody>

      </table>





      <Modal
      show={modalInsertar}
      onHidde={abrirCerrarModalInsertar}
      >
        
        {bodyInsertar}
        
        
      </Modal>

      <Modal
      show={modalEditar}
      onHidde={abrirCerrarModalEditar}
      >
        {bodyEditar}
        
      </Modal>

      <Modal
      show={modalEliminar}
      onHidde={abrirCerrarModalEliminar}
      >
        {bodyEliminar}
        
      </Modal>

      <Modal
      show={modalVer}
      onHidde={abrirCerrarModalVer}
      >
        {bodyVer}
        
      </Modal>



      

      
    </div>
  );
}

export default App;
