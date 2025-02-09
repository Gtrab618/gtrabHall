import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { FormControl, InputLabel, Select, MenuItem, Divider, Checkbox, FormControlLabel, TextField, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Switch, Button, Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import { getMunicipios, getRanges, getTributes, getUnidades, saveFactura } from '../../../services/PayloadFacService';
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
import { Factura } from '../../models/other/factura';
import { passNumberFacture } from '../../models/other/interfaceOther';

const listPayForm = [
  { text: 'Pago al contado', id: '1' },
  { text: 'Pago a crédito', id: '2' }
];

const listTributosCli = [
  { text: 'IVA', id: '18' },
  { text: 'No aplica*', id: '21' }
];

const listLegalOrganization = [
  { text: 'Persona jurídica', id: '1' },
  { text: 'Persona Natural', id: '2' }
]

const listMethodPay = [
  { text: 'Efectivo', id: '10' },
  { text: 'Consignación', id: '42' },
  { text: 'Cheque', id: '20' },
  { text: 'Trasferencia', id: '47' },
  { text: 'Bonos', id: '71' },
  { text: 'Vales', id: '72' },
  { text: 'Medio de pago no definido', id: '1' },
  { text: 'Tarjeta de Débito', id: '49' },
  { text: 'Tarjeta de Crédito', id: '48' },
  { text: 'Otro*', id: 'ZZZ' }
];

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
export default function MainGrid(props:passNumberFacture) {
  const [ranges, setRanges] = useState<Ranges[]>([]);
  const [tributes, setTributes] = useState<Tributes[]>([]);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [unidades, setUnidades] = useState<Unidades[]>([])

  const [referenceCode, setReferenceCode] = useState('');
  const [observation, setObservation] = useState('');
  const [payForm, setPayForm] = useState('1');
  const [methodPay, setMethodPay] = useState('10');

  const [rage, setRange] = useState('');
  const [tribute, setTribute] = useState('18');
  const [municipio, setMunicipio] = useState('');
  const [unidad, setUnidad] = useState('');

  const [initDate, setInitDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [finalDate, setFinalDate] = useState<dayjs.Dayjs | null>(dayjs().add(1, 'day'));
  const [datePay, setDatePay] = useState<dayjs.Dayjs | null>(null);
  const [initTime, setInitTime] = useState(dayjs());
  const [finalTime, setFinalTime] = useState(dayjs());

  {/* validation data generar factura */ }
  const [document, setDocument] = useState('1');
  const [numberId, setNumberId] = useState("124151")
  const [namePer, setNamePer] = useState("Gonalez Pepe Ramon")
  const [empresa, setEmpresa] = useState("Gtrab618")
  const [gmail, setGmail] = useState("elpepe@gmail.com")
  const [addres, setAddres] = useState("Calle San vicente 1")
  const [numberPhone, setNumberPhone] = useState("01065321");
  const [legalOrganization, setLegalOrganization] = useState("1");
  const [btnLoad,setBtnLoad]=useState(false)

  const [items, setItems] = useState<Items[]>([])
  const [message, setMessage] = useState("");


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

  const [open, setOpen] = React.useState(false);

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

  const recoverInitDate = (date: dayjs.Dayjs | null) => {
    setInitDate(date)

  }

  const recoverFinalDate = (date: dayjs.Dayjs | null) => {

    setFinalDate(date)
  }

  const recoverDatePay = (date: dayjs.Dayjs | null) => {
    setDatePay(date)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const revisionFactura = () => {
    setBtnLoad(true)
    const factura: Factura = new Factura();

    factura.observation = observation
    factura.numbering_range_id = parseInt(rage)
    factura.reference_code = referenceCode
    factura.payment_form = payForm
    if (payForm === "2") {
      factura.payment_due_date = datePay?.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
    }


    if (initDate?.isBefore(finalDate)) {

      factura.billing_period.start_date = initDate?.format("YYYY-MM-DD") ?? ""
      factura.billing_period.start_time = initTime.format("HH:mm:ss")
      factura.billing_period.end_time = finalTime.format("HH:mm:ss")
      factura.billing_period.end_date = finalDate?.format("YYYY-MM-DD") ?? ""

    } else {
      setMessage("PERÍODO FACTURACIÓN: La fecha final tiene que ser mayor")
      setOpen(true)
      return
    }




    factura.customer.identification = numberId
    factura.customer.company = empresa
    factura.customer.trade_name = ""
    factura.customer.names = namePer
    factura.customer.address = addres
    factura.customer.email = gmail
    factura.customer.phone = numberPhone
    factura.customer.legal_organization_id = legalOrganization
    factura.customer.tribute_id = tribute
    factura.customer.identification_document_id = document
    factura.customer.municipality_id = municipio

    factura.items = items



    getRanges().then(data => {
      setRanges(data)
    })

    saveFactura(factura).then (data =>{
      
      setMessage("Factura creada exitosamente")   
      setOpen(true)
      props.getNumberFacture(data.bill.number)
    
    }).catch(error=>{
      console.log(error)
      if(error.response.data.data){
        setMessage("Error:"+JSON.stringify(error.response.data.data, null, 2))   
      }else{
        setMessage("Error: Seleccione ReteRenta ->"+JSON.stringify(error.response.data, null, 2)) 
      }
      setBtnLoad(false)
      setOpen(true)
    })


  
  }

  return (



    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Typography component="h2" variant="h6">
        Crear factura
      </Typography>

      <Typography component="p">
        Datos Pago
      </Typography>

      <div>

        <Grid container spacing={2}>



          <Grid size={{ xs: 6, sm: 4, md: 3 }} >

            <TextField
              id="filled-multiline-static"
              label="Descripción"
              multiline
              rows={4}
              variant="standard"
              helperText="opcional"
              onChange={e => setObservation(e.target.value)}
              slotProps={{
                htmlInput: {
                  maxLength: 250, // Aplicar máximo de caracteres al `<input>` subyacente
                },
              }}
            />

          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField variant="outlined" value={referenceCode} label="Códido Referencia" onChange={e => setReferenceCode(e.target.value)} slotProps={{
              htmlInput: {
                maxLength: 15, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>


          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Forma de pago</InputLabel>
              <Select
                value={payForm}
                displayEmpty
                onChange={e => setPayForm(e.target.value)}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{
                  height: "35px"
                }}
              >
                {listPayForm?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>{item.text}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </Grid>

          {payForm === "2" && (
            <Grid size={{ xs: 6, sm: 4, md: 3 }}>
              <CustomDatePicker title="Fecha vencimiento" getDate={recoverDatePay} />
            </Grid>
          )}
          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Método Pago</InputLabel>
              <Select
                value={methodPay}
                displayEmpty
                onChange={e => setMethodPay(e.target.value)}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{
                  height: "35px"
                }}
              >
                {listMethodPay?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>{item.text}</MenuItem>
                ))}

              </Select>
            </FormControl>
          </Grid>

        </Grid>


      </div>


      <Divider sx={{ margin: '20px 0' }} />
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
            {listTributosCli?.map((item, index) => (
              <MenuItem key={index} value={item.id}>{item.text}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Municipios</InputLabel>
          <Select
            value={municipio}
            displayEmpty
            onChange={e => setMunicipio(String(e.target.value))}
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
                <CustomDatePicker title='Fecha de inicio' getDate={recoverInitDate} />
              </Grid>

              <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField value={initTime}
                    onChange={e => setInitTime(e ?? dayjs())}
                    sx={{
                      marginTop: "18px"
                    }}
                    label="Hora de inicio"
                    format="HH:mm:ss"
                  />
                </LocalizationProvider>
              </Grid>

              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <CustomDatePicker title='Fecha de final' getDate={recoverFinalDate} />
              </Grid>



              <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField value={finalTime}
                    onChange={e => setFinalTime(e ?? dayjs())}
                    sx={{
                      marginTop: "18px"
                    }}
                    label="Hora de fin"
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

          <Grid size={{ xs: 6, sm: 4, md: 3 }}>

            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label" sx={{ marginTop: "-5px" }}>Identidad</InputLabel>
              <Select
                value={legalOrganization}
                displayEmpty
                onChange={e => setLegalOrganization(e.target.value)}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{
                  height: "35px"
                }}
              >
                {listLegalOrganization?.map((item, index) => (
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
            <TextField value={namePer} onChange={e => setNamePer(e.target.value)} sx={{
              top: "6px"
            }} label="Nombre" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 35, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField value={empresa} onChange={e => setEmpresa(e.target.value)} sx={{
              top: "6px"
            }} label="Empresa" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField value={gmail} onChange={e => setGmail(e.target.value)} sx={{
              top: "6px"
            }} label="Correo electrónico" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField value={addres} onChange={e => setAddres(e.target.value)} sx={{
              top: "6px"
            }} label="Dirección" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <NumericFormat
              value={numberPhone}
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
        <Button variant="contained" color="success" onClick={revisionFactura} loading={btnLoad}>
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
      code: "01",
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
                            <MenuItem key={index} value={item.code}>{item.name}</MenuItem>
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

