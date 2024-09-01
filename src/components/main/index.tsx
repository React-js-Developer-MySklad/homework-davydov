import { FC, useState } from 'react'
import * as css from './index.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '../modal';
import { Counterparty, getCounterparty } from '../../api/counterpartyApi';


export const Main: FC = () => {
  
  const [counterparty, setCounterparty] = useState<Counterparty[]>(getCounterparty());
  const [selected, setSelected] = useState<Counterparty | undefined>()

  return (
    <div className={css.container}>
      <Modal selected={selected} setSelected={setSelected} setCounterparty={setCounterparty}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Имя</TableCell>
              <TableCell align="right">ИНН</TableCell>
              <TableCell align="right">КПП</TableCell>
              <TableCell align="right">Адрес</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counterparty.map((row) => (
              <TableRow
                key={row.id}
                style={{cursor: 'pointer'}}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={(e) => {setSelected(row)}}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.inn}</TableCell>
                <TableCell align="right">{row.kpp}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <DeleteIcon style={{cursor: 'pointer'}} onClick={(e) => { 
                    e.stopPropagation(); 
                    let editedCounterparty = counterparty.filter(v => v.id !== row.id);
                    localStorage.setItem('counterparty', JSON.stringify(editedCounterparty));
                    setCounterparty(editedCounterparty); 
                  }}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}