import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';


import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@mui/material';
import {Edit,Delete} from "@mui/icons-material"



const baseUrl='http://localhost:3001/cars'






function App() {

  const [data, setData]=useState([]);

  const [modalInsertar, setModalInsertar]=useState(false);

   const peticionGet=async()=>{
     await axios.get(baseUrl)
     .then(response=>{
       setData(response.data);
     })
   }


   const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
   }

   useEffect(()=>{
     peticionGet();

   })

//falta styles
  const bodyInsertar=(
    <div className='modal'>
      <h3>Agregar Nuevo Carro</h3>
      <TextField label="Id"/>
      <br />
      <TextField label="Marca"/>
      <br />
      <TextField label="Modelo"/>
      <br />
      <TextField label="Year"/>
      <br />
      <TextField label="Cilindrada"/>
      <br />
      <TextField label="Procedencia"/>
      <br />
      <TextField label="Pic1"/>
      <br />
      <TextField label="Pic2"/>
      <br /><br />
      <div align="right">
        <Button color="primary">Insertar</Button>
        <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>
      </div>
      

    </div>
  )


  return (
    <div className="App">
      <br />

      <Button onClick={abrirCerrarModalInsertar}>
        Insertar
      </Button>


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
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
                <TableCell>{cars.id}</TableCell>
                <TableCell>{cars.marca}</TableCell>
                <TableCell>{cars.modelo}</TableCell>
                <TableCell>{cars.year}</TableCell>
                <TableCell>{cars.cilindrada}</TableCell>
                <TableCell>{cars.procedencia}</TableCell>
                <TableCell>{cars.precio}</TableCell>
                <TableCell>{cars.pic1}</TableCell>
                <TableCell>{cars.pic2}</TableCell>
                <TableCell>
                  <Edit />
                  &nbsp;&nbsp;&nbsp;
                  <Delete />
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
      
    </div>
  );
}

export default App;
