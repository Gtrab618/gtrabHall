import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { FormControl, InputLabel, Select, MenuItem, Divider, Checkbox, FormControlLabel, TextField, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Switch, Button } from '@mui/material';
import { getMunicipios, getRanges, getTributes, getUnidades } from '../../../services/PayloadFacService';
import { useEffect, useState } from 'react';
import { Ranges } from '../../models/other/ranges';
import { Tributes } from '../../models/other/tributes';
import { Municipios } from '../../models/other/municipios';
import { Unidades } from '../../models/other/unidades';
import CustomDatePicker from './CustomDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import { Items } from '../../models/other/items';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { withholding } from '../../models/other/withholding';
import { CodeStandard } from '../../models/other/codeStandard';

const listIdentity = [
  { text: 'Registro civil', id: '1' },
  { text: 'Tarjeta de identidad', id: '2' },
  { text: 'Cédula de ciudadanía', id: '3' },
  { text: 'Tarjeta de extranjería', id: '4' },
  { text: 'Cédula de extranjería', id: '5' },
  { text: 'NIT', id: '6' },
  { text: 'Pasaporte', id: '7' },
  { text: 'Documento de identificación extranjero', id: '8' },
  { text: 'PEP', id: '9' },
  { text: 'NIT otro país', id: '10' },
  { text: 'NUIP*', id: '11' },
];

export default function MainGrid() {
  const [ranges, setRanges] = useState<Ranges[]>([]);
  const [tributes, setTributes] = useState<Tributes[]>([]);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [unidades, setUnidades] = useState<Unidades[]>([])


  const [rage, setRange] = useState('');
  const [tribute, setTribute] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [unidad, setUnidad] = useState('');
  const [document, setDocument] = useState('');


  const [items, setItems] = useState<Items[]>([])

  useEffect(() => {
    getRanges().then(data => {
      setRanges(data)
    })
  }, [])

  useEffect(() => {
    getTributes().then(data => {
      setTributes(data)
    })
  }, [])

  useEffect(() => {
    getMunicipios().then(data => {
      setMunicipios(data)
    })
  }, [])

  useEffect(() => {
    getUnidades().then(data => {
      setUnidades(data)
    })
  }, [])



  useEffect(() => {
    if (ranges.length > 0) {
      setRange(ranges[0].id.toString());
    }
  }, [ranges])

  useEffect(() => {
    if (tributes.length > 0) {
      setTribute(tributes[0].id.toString());
    }
  }, [tributes])

  useEffect(() => {
    if (municipios.length > 0) {
      setMunicipio(municipios[0].id.toString());
    }

  }, [municipios])

  useEffect(() => {
    if (unidades.length > 0) {
      setUnidad(unidades[0].id.toString());
    }

  }, [unidades])


  const [peFactu, setPefactu] = useState(false);

  const [numberPhone, setNumberPhone] = useState(0);

  {/* validation data generar factura */ }
  const [numberId, setNumberId] = useState("")
  const [namePer,setNamePer]=useState("")
  const [gmail,setGmail]=useState("")
  const [addres,setAddres]=useState("")


  const addItem = () => {

    const newItem = new Items(); // Crear una nueva instancia de `Items`
    newItem.code_reference = "prod" + items.length; // Asignar valores a las propiedades según sea necesario
    newItem.name = "";
    newItem.tribute_id = 1;
    newItem.standard_code_id = 1;
    newItem.quantity = 1;
    newItem.price = 1;
    newItem.unit_measure_id = 70;
    newItem.withholding_taxes = [];

    setItems((prevItems) => [...prevItems, newItem])
  }

  const updateItems = (itemUpdate: Items) => {

    const itemsActualizados = items.map((p) =>
      p.code_reference === itemUpdate.code_reference ? itemUpdate : p
    );
    setItems(itemsActualizados)

  }

  const recoverData = () => {

    console.log(items)
  }

  return (



    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

      <Typography component="h2" variant="h6">
        Crear factura
      </Typography>

      <Typography component="p">
        Datos factura
      </Typography>
      <div>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Rangos</InputLabel>
          <Select
            value={rage}
            displayEmpty
            onChange={e => setRange(e.target.value)}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {ranges?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.document}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Tributos</InputLabel>
          <Select
            value={tribute}
            displayEmpty
            onChange={e => setTribute(e.target.value)}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {tributes?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Municipios</InputLabel>
          <Select
            value={municipio}
            displayEmpty
            onChange={e => setMunicipio(e.target.value)}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {municipios?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Unidades</InputLabel>
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
        </FormControl>
      </div>

      <FormControlLabel control={<Checkbox />} onChange={e => setPefactu(e.target.checked)} label="Período Facturación" />

      {
        peFactu ? (
          <div >
            <Grid container >
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <CustomDatePicker text={"Fecha de inicio"}/>
              </Grid>

              <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    sx={{
                      marginTop: "18px"
                    }}
                    label="Hora de inicio"
                    defaultValue={dayjs()}
                    format="HH:mm:ss"
                  />
                </LocalizationProvider>
              </Grid>

              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <CustomDatePicker text={"Fecha de fin"} />
              </Grid>


              <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    sx={{
                      marginTop: "18px"
                    }}
                    label="Hora de fin"
                    defaultValue={dayjs()}
                    format="HH:mm:ss"
                  />
                </LocalizationProvider>
              </Grid>

            </Grid>

          </div>



        ) : (
          null
        )
      }

      <Divider sx={{ margin: '20px 0' }} />

      <Typography component="p">
        Datos cliente
      </Typography>
      <div>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>

            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Identidad</InputLabel>
              <Select
                value={document}
                displayEmpty
                onChange={e => setDocument(e.target.value)}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{
                  height: "35px"
                }}
              >
                {listIdentity?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>{item.text}</MenuItem>
                ))}

              </Select>
            </FormControl>

          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} 
              value={numberId}
              onChange={e => setNumberId(e.target.value)}
              id="outlined-basic" label="Número documento" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 12, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Nombre" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 35, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Empresa" variant="outlined" defaultValue={"Gtrab618"} slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Correo electrónico" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Dirección" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <NumericFormat

              onChange={e => setNumberPhone(e.target.value)}
              customInput={TextField}
              valueIsNumericString
              variant="standard"
              label="Teléfono"
              helperText="opcional"
            />
          </Grid>
        </Grid>


      </div>
      <Divider sx={{ margin: '20px 0' }} />
      <Typography component="p">
        Datos Producto
      </Typography>

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
              <TableCell align="center">Descuento %</TableCell>
              <TableCell align="center">Impuesto %</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Unidad</TableCell>
              <TableCell align="center">Código Estándar</TableCell>
              <TableCell align="center">Impuesto Activo</TableCell>
              <TableCell align="center">Tributo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((itemTable, index) => (
              <Row key={index} onChange={updateItems} itemProp={itemTable} unidadesRow={unidades} tributosRow={tributes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        <Button variant="contained" color="success" onClick={recoverData}>
          Generar Factura
        </Button>
      </Box>


    </Box>
  );
}


function Row(props: itemsProps) {

  const [totalPrice, setTotalPrice] = useState(0)


  const [updateTotal, setUpdateTotal] = useState(false)

  const [codeStandardList, setCodeStandardList] = React.useState<CodeStandard[]>([
    { id: 1, name: "Estándar de adopción del contribuyente" },
    { id: 2, name: "UNSPSC" },
    { id: 3, name: "Partida Arancelaria" },
    { id: 4, name: "GTIN" }
  ])




  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const discountPrice = props.itemProp.price - (props.itemProp.price * (props.itemProp.discount_rate / 100))

    setTotalPrice((discountPrice + (discountPrice * parseInt(props.itemProp.tax_rate) / 100)) * props.itemProp.quantity)


  }, [updateTotal])

  useEffect(() => {
    const discountPrice = props.itemProp.price - (props.itemProp.price * (props.itemProp.discount_rate / 100))

    setTotalPrice((discountPrice + (discountPrice * parseInt(props.itemProp.tax_rate) / 100)) * props.itemProp.quantity)

  }, [])



  const updateTest2 = () => {
    const subItemnew: withholding = {
      code: "1",
      withholding_tax_rate: "1"
    }
    props.onChange({ ...props.itemProp, withholding_taxes: [...props.itemProp.withholding_taxes, subItemnew] })
  }


  const updateSubItem = (subItemUpd: withholding, indexPass: number) => {

    const subItemsUpdate = props.itemProp.withholding_taxes.map((sp, index) =>
      index === indexPass ? subItemUpd : sp
    );

    props.onChange({ ...props.itemProp, withholding_taxes: subItemsUpdate })
  }

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

        {/*item.*.code_reference*/}
        <TableCell component="th" scope="row" sx={{ minWidth: "75px" }}>
          <TextField variant="outlined" value={props.itemProp.code_reference} disabled slotProps={{
            htmlInput: {
              maxLength: 10, // Aplicar máximo de caracteres al `<input>` subyacente
            },
          }} />
        </TableCell>

        {/*item.*.name*/}
        <TableCell sx={{ minWidth: "100px", height: "100px" }}>
          <TextField variant="outlined" value={props.itemProp.name} onChange={(e) => props.onChange({ ...props.itemProp, name: e.target.value })} slotProps={{
            htmlInput: {
              maxLength: 10, // Aplicar máximo de caracteres al `<input>` subyacente
            },
          }} />
        </TableCell>

        {/* item.*.quantity*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined" value={props.itemProp.quantity} onChange={(e) => { props.onChange({ ...props.itemProp, quantity: isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value) }); setUpdateTotal(!updateTotal); }}
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>

        {/* item.*.discount_rate*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined" value={props.itemProp.discount_rate} onChange={(e) => { props.onChange({ ...props.itemProp, discount_rate: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) }); setUpdateTotal(!updateTotal) }}
            type="number"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>

        {/* item.*.tax_rate*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined" value={props.itemProp.tax_rate} onChange={(e) => { props.onChange({ ...props.itemProp, tax_rate: isNaN(parseInt(e.target.value)) ? "0" : e.target.value }); setUpdateTotal(!updateTotal) }}
            type="number"
            slotProps={{
              htmlInput: {
                min: 0,
                max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

              },
            }} />
        </TableCell>

        {/* item.*.price*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <TextField variant="outlined" value={props.itemProp.price} onChange={(e) => { props.onChange({ ...props.itemProp, price: isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value) }); setUpdateTotal(!updateTotal) }}
            type="number"
            slotProps={{
              htmlInput: {
                min: 1
              },
            }} />
        </TableCell>

        <TableCell >
          {totalPrice}
        </TableCell>

        {/*item.*.unit_measure_id*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <Select
            value={props.itemProp.unit_measure_id}
            displayEmpty
            onChange={(e) => props.onChange({ ...props.itemProp, unit_measure_id: parseInt(e.target.value) })}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {props.unidadesRow?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </TableCell>


        {/*item.*.tax_rate*/}
        <TableCell sx={{ minWidth: "100px" }}>
          <Select
            value={props.itemProp.standard_code_id}
            displayEmpty
            onChange={(e) => props.onChange({ ...props.itemProp, standard_code_id: parseInt(e.target.value) })}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {codeStandardList?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </TableCell>



        {/*items.*.is_excluded*/}
        <TableCell>
          <Switch checked={props.itemProp.is_excluded === 1} onChange={(e) => props.onChange({ ...props.itemProp, is_excluded: event.target.checked ? 1 : 0 })} />
        </TableCell>


        {/*items.*.tribute_id */}
        <TableCell sx={{ minWidth: "100px" }}>
          <Select
            value={props.itemProp.tribute_id}
            displayEmpty
            onChange={(e) => props.onChange({ ...props.itemProp, tribute_id: parseInt(e.target.value) })}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            sx={{
              height: "35px"
            }}
          >
            {props.tributosRow.map((item, index) => (
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
              </Typography>

              <Table size="small" aria-label="purchases">


                <TableHead>
                  <TableRow>
                    <TableCell>Retenciones</TableCell>
                    <TableCell>    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => updateTest2()}>
                      <AddCircleOutlineSharpIcon />
                    </IconButton></TableCell>

                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>Código Retención</TableCell>
                    <TableCell>Porcentaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.itemProp.withholding_taxes?.map((holding, index) => (
                    <TableRow key={index}>
                      <TableCell >


                        <Select
                          value={holding.code}
                          displayEmpty
                          onChange={(e) => updateSubItem({ ...holding, code: String(e.target.value) }, index)}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          sx={{
                            height: "35px"
                          }}
                        >
                          {props.tributosRow.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                          ))}

                        </Select>
                      </TableCell>


                      <TableCell>
                        <TextField variant="outlined" value={holding.withholding_tax_rate} onChange={(e) => updateSubItem({ ...holding, withholding_tax_rate: e.target.value }, index)}
                          type="number"
                          slotProps={{
                            htmlInput: {
                              min: 1,
                              max: 100, // Aplicar máximo de caracteres al `<input>` subyacente

                            },
                          }}
                        />

                      </TableCell>
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

interface itemsProps {

  itemProp: Items;
  onChange: (itemTest: Items) => void;
  unidadesRow: Unidades[]
  tributosRow: Tributes[]

}

interface dateFactu{
  
}