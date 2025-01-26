import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem, Switch } from '@mui/material';
import { Unidades } from '../models/other/unidades';
import { useState } from 'react';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { Items } from '../models/other/items';


const [items,setItems]=useState<Items[]>([])

function Row(props: { row: ReturnType<typeof createData> }) {

  const [unidades, setUnidades] = React.useState<Unidades[]>([
    { id: 1, code: "A1", name: "Unidad 1" },
    { id: 2, code: "B2", name: "Unidad 2" },
    { id: 3, code: "C3", name: "Unidad 3" },
  ]);

  {/* 
  const [unidad, setUnidad] = useState<Unidades>(new Unidades());
*/}

  const [unidad, setUnidad] = useState('');
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    // Asignar la primera unidad al montar el componente
    if (unidades.length > 0) {
      setUnidad(unidades[0].id.toString());
    }
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

        {/* los datos de producto */}

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

        </TableCell>

        <TableCell component="th" scope="row" sx={{ minWidth: "75px" }}>
          <TextField variant="outlined" slotProps={{
            htmlInput: {
              maxLength: 10, // Aplicar máximo de caracteres al `<input>` subyacente
            },
          }} />
        </TableCell>

        <TableCell sx={{ minWidth: "100px", height: "100px" }}>
          <TextField variant="outlined" slotProps={{
            htmlInput: {
              maxLength: 10, // Aplicar máximo de caracteres al `<input>` subyacente
            },
          }} />
        </TableCell>
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined"
            type="number"
            defaultValue="1"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined"
            type="number"
            defaultValue="0"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined"
            type="number"
            defaultValue="1"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined"
            type="number"
            defaultValue="1"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>

        <TableCell sx={{ minWidth: "100px" }}>
          <Select
            value={unidad}
            displayEmpty
            onChange={e => setUnidad(e.target.value)}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {unidades?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </TableCell>

        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined" slotProps={{
            htmlInput: {
              maxLength: 10, // Aplicar máximo de caracteres al `<input>` subyacente
            },
          }} />
        </TableCell>

        <TableCell>
          <Switch />
        </TableCell>

        <TableCell sx={{ minWidth: "100px" }}>
          <Select
            value={unidad}
            displayEmpty
            onChange={e => setUnidad(e.target.value)}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {unidades?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Retenciones
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Código Retención</TableCell>
                    <TableCell>Porcentaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>

                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99)
  ]);
 const print= () =>{
  const test = [createData("Frozenhur", 159, 6.0, 24, 1.0, 2.99)];
  setRows((prevArray) => [...prevArray, ...test]);
  console.log(rows.length)
 }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton color="primary" aria-label="add to shopping cart" onClick={() => print()}>
                <AddCircleOutlineSharpIcon/>
              </IconButton>
            </TableCell>
            <TableCell align="center">Código Referencia</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Descuento</TableCell>
            <TableCell align="center">Impuesto</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Unidad</TableCell>
            <TableCell align="center">Código Estándar</TableCell>
            <TableCell align="center">Impuesto Activo</TableCell>
            <TableCell align="center">Tributo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}