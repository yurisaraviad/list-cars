import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';


import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@mui/material';
import {Edit,Delete,Visibility} from "@mui/icons-material"



const baseUrl='http://localhost:3001/cars/'


//23:33



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

//falta styles
  const bodyInsertar=(
    <div className='modal'>
      <h3>Agregar Nuevo Carro</h3>
      
      <TextField name="marca" className='inputMaterial' label="Marca" onChange={handleChange}/>
      <br />
      <TextField name="modelo" className='inputMaterial' label="Modelo" onChange={handleChange}/>
      <br />
      <TextField name="year" className='inputMaterial' label="Year" onChange={handleChange}/>
      <br />
      <TextField name="cilindrada" className='inputMaterial' label="Cilindrada" onChange={handleChange}/>
      <br />
      <TextField name="procedencia" className='inputMaterial' label="Procedencia" onChange={handleChange}/>
      <br />
      <TextField name="precio" className='inputMaterial' label="Precio" onChange={handleChange}/>
      <br />
      <TextField name="pic1" className='inputMaterial' label="Pic1" onChange={handleChange}/>
      <br />
      <TextField name="pic2" className='inputMaterial' label="Pic2" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
      

    </div>
  )

  const bodyEditar=(
    <div className='modal'>
      <h3>Editar Carro</h3>
      
      <TextField name="marca" className='inputMaterial' label="Marca" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.marca}/>
      <br />
      <TextField name="modelo" className='inputMaterial' label="Modelo" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.modelo}/>
      <br />
      <TextField name="year" className='inputMaterial' label="Year" onChange={handleChange}  value={carsSeleccionada && carsSeleccionada.year}/>
      <br />
      <TextField name="cilindrada" className='inputMaterial' label="Cilindrada" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.cilindrada}/>
      <br />
      <TextField name="procedencia" className='inputMaterial' label="Procedencia" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.procedencia}/>
      <br />
      <TextField name="precio" className='inputMaterial' label="Precio" onChange={handleChange} value={carsSeleccionada && carsSeleccionada.precio}/>
      <br />
      <TextField name="pic1" className='inputMaterial' label="Pic1" onChange={handleChange}  value={carsSeleccionada && carsSeleccionada.pic1}/>
      <br />
      <TextField name="pic2" className='inputMaterial' label="Pic2" onChange={handleChange}  value={carsSeleccionada && carsSeleccionada.pic2}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      

    </div>
  )
  

  const bodyEliminar=(
    <div className='modal'>
      <p>Estas seguro que deseas eliminar el carro <b>{carsSeleccionada && carsSeleccionada.modelo}</b> ?</p>
      
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Si</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>
      

    </div>
  )

  const bodyVer=(
    <div className='modal'>
      <h3>Ver Carro</h3>
      
      {/* <TextField name="marca" className='inputMaterial' label="Marca"  value={carsSeleccionada && carsSeleccionada.marca}/>
      <br />
      <TextField name="modelo" className='inputMaterial' label="Modelo"  value={carsSeleccionada && carsSeleccionada.modelo}/>
      <br />
      <TextField name="year" className='inputMaterial' label="Year"   value={carsSeleccionada && carsSeleccionada.year}/>
      <br />
      <TextField name="cilindrada" className='inputMaterial' label="Cilindrada"  value={carsSeleccionada && carsSeleccionada.cilindrada}/>
      <br />
      <TextField name="procedencia" className='inputMaterial' label="Procedencia"  value={carsSeleccionada && carsSeleccionada.procedencia}/>
      <br />
      <TextField name="precio" className='inputMaterial' label="Precio"  value={carsSeleccionada && carsSeleccionada.precio}/>
      <br />
      <TextField name="pic1" className='inputMaterial' label="Pic1"   value={carsSeleccionada && carsSeleccionada.pic1}/>
      <br />
      <TextField name="pic2" className='inputMaterial' label="Pic2"  value={carsSeleccionada && carsSeleccionada.pic2}/>
      <br /><br /> */}
      
      <TableContainer>
        <Table>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Cilindrada</TableCell>
              <TableCell>Procedencia</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
              {carsSeleccionada.marca}
              </TableCell>
              <TableCell>
              {carsSeleccionada.modelo}
              </TableCell>
              <TableCell>
              {carsSeleccionada.year}
              </TableCell>
              <TableCell>
              {carsSeleccionada.cilindrada}
              </TableCell>
              <TableCell>
              {carsSeleccionada.procedencia}
              </TableCell>
              <TableCell>
              {carsSeleccionada.precio}
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Carrusel</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
      
      <br />



      <div align="right">
      
        
        <Button onClick={()=>abrirCerrarModalVer()}>Cancelar</Button>
      </div>
      

    </div>
  )
  








  return (
    <div className="App">
      <br />

      <Button onClick={()=>abrirCerrarModalInsertar()}>
        Insertar
      </Button>


      <TableContainer>
        <Table>
          <TableHead className='tableHead'>
            <TableRow>
              {/* <TableCell>Id</TableCell> */}
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Cilindrada</TableCell>
              <TableCell>Procedencia</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Pic1</TableCell>
              <TableCell>Pic2</TableCell>
              <TableCell>Acciones</TableCell>
              


            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(cars=>(
              <TableRow key={cars.id}>
                {/* <TableCell>{cars.id}</TableCell> */}
                <TableCell>{cars.marca}</TableCell>
                <TableCell>{cars.modelo}</TableCell>
                <TableCell>{cars.year}</TableCell>
                <TableCell>{cars.cilindrada}</TableCell>
                <TableCell>{cars.procedencia}</TableCell>
                <TableCell>{cars.precio}</TableCell>
                <TableCell>{cars.pic1}</TableCell>
                <TableCell>{cars.pic2}</TableCell>
                <TableCell>
                  <Edit className="iconos" onClick={()=>seleccionarcars(cars,'Editar')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete className="iconos" onClick={()=>seleccionarcars(cars,'Eliminar')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Visibility className="iconos" onClick={()=>seleccionarcars(cars,'Ver')}/>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>


        </Table>

      </TableContainer>


      <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
      >
        {bodyInsertar}
        
      </Modal>

      <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
      >
        {bodyEditar}
        
      </Modal>

      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
      >
        {bodyEliminar}
        
      </Modal>

      <Modal
      open={modalVer}
      onClose={abrirCerrarModalVer}
      >
        {bodyVer}
        
      </Modal>
      

      
    </div>
  );
}

export default App;
