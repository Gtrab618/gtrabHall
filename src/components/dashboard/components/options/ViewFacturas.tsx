import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Copyright } from '@mui/icons-material';
import { Button, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Facture } from '../../../models/factures/facture';
import { getAllFactures, getNumberFactureServi } from '../../../../services/search/SearchFactura';
import VisibilityIcon from '@mui/icons-material/Visibility';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function ViewFacturas() {
  const [listFactures, setListFactures] = useState<Facture[]>([]);
  const [facturedTemp, setFactureTemp] = useState<Facture[]>([]);
  const [numberSearch, setNumberSearch] = useState("")

  useEffect(() => {
    getAllFactures().then(data => {
      setListFactures(data)
    })
  }, [])

  useEffect(() => {
    if (numberSearch === "") {
      setListFactures([...facturedTemp]);
    }
  }, [numberSearch])

  const getFactureNumber = () => {
    if (numberSearch !== "") {
      setFactureTemp([...listFactures])
      getNumberFactureServi(numberSearch).then(data => {
        setListFactures(data)
      })


    }


  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Facturas
      </Typography>
      <Grid container spacing={2} marginBottom={"10px"}>

        <Grid size={{ xs: 6, sm: 4, md: 3 }} >
          <TextField id="outlined-basic" label="Número de factura" value={numberSearch} onChange={e => setNumberSearch(e.target.value)} />
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3 }} >
          <Button variant="contained" onClick={getFactureNumber}>Buscar</Button>
        </Grid>

      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Número de factura</StyledTableCell>
              <StyledTableCell align="center">Cliente Api</StyledTableCell>
              <StyledTableCell align="center">Gmail</StyledTableCell>
              <StyledTableCell align="center">Código referencia</StyledTableCell>
              <StyledTableCell align="center">Identificación</StyledTableCell>
              <StyledTableCell align="center">Fecha de creación</StyledTableCell>
              <StyledTableCell align="center">Opciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listFactures?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.number}
                </StyledTableCell>
                <StyledTableCell align="center">{row.api_client_name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.reference_code}</StyledTableCell>
                <StyledTableCell align="right">{row.identification}</StyledTableCell>
                <StyledTableCell align="right">{row.created_at}</StyledTableCell>
                <StyledTableCell align="right"><IconButton color="primary" onClick={() => alert("Borrado")}>
                  <VisibilityIcon />
                </IconButton></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Copyright sx={{ my: 4 }} />

    </Box>




  );
}
