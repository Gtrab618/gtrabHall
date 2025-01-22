import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import { FormControl, InputLabel, Select, MenuItem, Divider, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { getMunicipios, getRanges, getTributes, getUnidades } from '../../../services/PayloadFacService';
import { useEffect, useState } from 'react';
import { Ranges } from '../../models/other/ranges';
import { Tributes } from '../../models/other/tributes';
import { Municipios } from '../../models/other/municipios';
import { Unidades } from '../../models/other/unidades';
import CustomDatePicker from './CustomDatePicker';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';

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
                <CustomDatePicker text={"Fecha de inicio"} />
              </Grid>

              <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    sx={{
                      marginTop: "18px"
                    }}
                    label="Hora de inicio"
                    defaultValue={dayjs('2022-04-17T15:30')}
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
                    defaultValue={dayjs('2022-04-17T15:30')}
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
            }} id="outlined-basic" label="Número documento" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 15, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Nombre" variant="outlined" slotProps={{
              htmlInput: {
                maxLength: 30, // Aplicar máximo de caracteres al `<input>` subyacente
              },
            }} />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }} >
            <TextField sx={{
              top: "6px"
            }} label="Empresa" variant="outlined" slotProps={{
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
            />
          </Grid>
        </Grid>


      </div>
      <Divider sx={{ margin: '20px 0' }} />
      <Typography component="p">
        Datos Producto
      </Typography>
      





      
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>

        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}


