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
import { withholding } from '../models/other/withholding';

interface itemsProps{
  
  itemProp:Items;
  onChange: (itemTest: Items) => void;


}


function Row(props:itemsProps) {

  const [unidades, setUnidades] = React.useState<Unidades[]>([
    { id: 1, code: "A1", name: "Unidad 1" },
    { id: 2, code: "B2", name: "Unidad 2" },
    { id: 3, code: "C3", name: "Unidad 3" },
  ]);


  {/* 
  const [unidad, setUnidad] = useState<Unidades>(new Unidades());
*/}

  const [unidad, setUnidad] = useState('');
  const [open, setOpen] = React.useState(false);

    const updateTest2=()=>{
      const itemnew: withholding={
        code:"asdf",
        withholding_tax_rate:"asdf"
      }
      props.onChange({ ...props.itemProp,withholding_taxes:[...props.itemProp.withholding_taxes , itemnew] })
    }

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
              <IconButton color="primary" aria-label="add to shopping cart" onClick={() => props.onChange(props.itemProp)}>
                <AddCircleOutlineSharpIcon />
              </IconButton>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Código Retención</TableCell>
                    <TableCell>Porcentaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.itemProp.withholding_taxes?.map((holding) => (
                    <TableRow key={holding.code}>

                      <TableCell component="th" scope="row">
                        {holding.code}
                      </TableCell>
                      <TableCell>{holding.withholding_tax_rate}</TableCell>
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

  const [items, setItems] = useState<Items[]>([])

  const addItem = () => {

    const newItem = new Items(); // Crear una nueva instancia de `Items`
    newItem.code_reference = "REF001"; // Asignar valores a las propiedades según sea necesario
    newItem.name = "Producto 1";
    newItem.quantity = 10;
    newItem.price = 100;
    newItem.withholding_taxes = [
      { code: "Tax1", withholding_tax_rate: "5" }, // Ejemplo de datos para withholding_taxes
      { code: "Tax2", withholding_tax_rate: "10" },
    ];

    setItems((prevItems) => [...prevItems, newItem])
  }

  const addsubItem = (teim:Items)=>{
 
  
    const newData: withholding={
      code:"adsf",
      withholding_tax_rate:"sadf"
    }

    
  } 

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addItem()}>
                <AddCircleOutlineSharpIcon />
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
          {items?.map((itemTable) => (
            <Row key={itemTable.tribute_id} onChange={addsubItem} itemProp={itemTable} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}