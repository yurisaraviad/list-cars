import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';


import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@mui/material';
import {Edit,Delete} from "@mui/icons-material"



const baseUrl='http://localhost:3001/cars/'


//23:33



function App() {

  const [data, setData]=useState([]);

  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);



  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
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
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }


   const peticionGet=async()=>{
     await axios.get(baseUrl)
     .then(response=>{
       setData(response.data);
     })
   }


   const peticionPost=async()=>{
    await axios.post(baseUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
   }

   const peticionPut=async()=>{
    await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.marca=consolaSeleccionada.marca;
          consola.modelo=consolaSeleccionada.modelo;
          consola.year=consolaSeleccionada.year;
          consola.cilindrada=consolaSeleccionada.cilindrada;
          consola.procedencia=consolaSeleccionada.procedencia;
          consola.precio=consolaSeleccionada.precio;
          consola.pic1=consolaSeleccionada.pic1;
          consola.pic2=consolaSeleccionada.pic2;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
   }



   const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
   }

   const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
   }



   const seleccionarConsola=(cars, caso)=>{
    setConsolaSeleccionada(cars);
    (caso==='Editar')&&setModalEditar(true)
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
        <Button color="primary" onClick={()=>peticionPost()}   >Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
      

    </div>
  )

  const bodyEditar=(
    <div className='modal'>
      <h3>Editar Carro</h3>
      
      <TextField name="marca" className='inputMaterial' label="Marca" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.marca}/>
      <br />
      <TextField name="modelo" className='inputMaterial' label="Modelo" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.modelo}/>
      <br />
      <TextField name="year" className='inputMaterial' label="Year" onChange={handleChange}  value={consolaSeleccionada && consolaSeleccionada.year}/>
      <br />
      <TextField name="cilindrada" className='inputMaterial' label="Cilindrada" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.cilindrada}/>
      <br />
      <TextField name="procedencia" className='inputMaterial' label="Procedencia" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.procedencia}/>
      <br />
      <TextField name="precio" className='inputMaterial' label="Precio" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.precio}/>
      <br />
      <TextField name="pic1" className='inputMaterial' label="Pic1" onChange={handleChange}  value={consolaSeleccionada && consolaSeleccionada.pic1}/>
      <br />
      <TextField name="pic2" className='inputMaterial' label="Pic2" onChange={handleChange}  value={consolaSeleccionada && consolaSeleccionada.pic2}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
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
          <TableHead>
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
                  <Edit className="iconos" onClick={()=>seleccionarConsola(cars,'Editar')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete className="iconos"/>
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
      
    </div>
  );
}

export default App;
