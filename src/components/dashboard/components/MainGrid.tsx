import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';
import { getRanges } from '../../../services/PayloadFacService';
import { useEffect, useState } from 'react';
import { Ranges } from '../../models/other/ranges';




export default function MainGrid() {
  const [ranges, setRanges] = useState<Ranges[]>([]);
  
  useEffect(()=>{
    getRanges().then(data=>{
      setRanges(data)
    
    }).catch(error=>{
  
    })
  },[])


  const [age, setAge] = useState('');


  useEffect(()=>{
    if(ranges.length>0){
      setAge(ranges[0].id.toString());
     
    }
  },[ranges])



  return (
   
  

    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
   <div>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label" sx={{marginTop:"-5px"}}>Rangos</InputLabel>
        <Select
          value={age}
          displayEmpty
          onChange={e=>setAge(e.target.value)}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          sx={{
            height:"35px"
          }}
        >
          {ranges?.map((item,index)=>(
            <MenuItem key={index} value={item.id}>{item.document}</MenuItem>
          ))}

        </Select>
      </FormControl>

    </div>

      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Crear factura
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


