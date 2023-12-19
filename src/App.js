import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from '@mui/material';

const baseUrl='http://localhost:3001/cars'



function App() {

  const [data, setData]=useState([]);

   const peticionGet=async()=>{
     await axios.get(baseUrl)
     .then(response=>{
       setData(response.data);
     })
   }

   useEffect(()=>{
     peticionGet();

   })


  return (
    <div className="App">
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


            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(cars=>(
              <TableRow>
                <TableCell>{cars.id}</TableCell>
                <TableCell>{cars.marca}</TableCell>
                <TableCell>{cars.modelo}</TableCell>
                <TableCell>{cars.year}</TableCell>
                <TableCell>{cars.cilindrada}</TableCell>
                <TableCell>{cars.procedencia}</TableCell>
                <TableCell>{cars.precio}</TableCell>
                <TableCell>{cars.pic1}</TableCell>
                <TableCell>{cars.pic2}</TableCell>

              </TableRow>
            ))}
          </TableBody>


        </Table>

      </TableContainer>
      
    </div>
  );
}

export default App;
