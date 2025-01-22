import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import { FormControl, InputLabel, Select, MenuItem, Divider, Checkbox, FormControlLabel } from '@mui/material';
import { getMunicipios, getRanges, getTributes, getUnidades } from '../../../services/PayloadFacService';
import { useEffect, useState } from 'react';
import { Ranges } from '../../models/other/ranges';
import { Tributes } from '../../models/other/tributes';
import { Municipios } from '../../models/other/municipios';
import { Unidades } from '../../models/other/unidades';
import * as React from 'react';
import CustomDatePicker from './CustomDatePicker';


export default function MainGrid() {
  const [ranges, setRanges] = useState<Ranges[]>([]);
  const [tributes, setTributes] = useState<Tributes[]>([]);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [unidades, setUnidades] = useState<Unidades[]>([])


  const [rage, setRange] = useState('');
  const [tribute, setTribute] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [unidad, setUnidad] = useState('');

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

  useEffect(() => {
    console.log(peFactu)

  }, [peFactu])
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
              <Grid size={{xs:12, md:4, sm:3}}>
              <CustomDatePicker text={"Fecha de inicio"} />
              </Grid>

              <Grid size={{xs:12, md:4, sm:3}}>
              <CustomDatePicker text={"Fecha de inicio"} />
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


