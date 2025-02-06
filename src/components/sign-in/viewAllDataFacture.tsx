
import { Paper, Box, Avatar, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { recivedNumberFacture } from '../models/other/interfaceOther';
import { useEffect, useState } from 'react';
import { RegisterOk } from '../models/savedFactura/registerOk';
import { getAllDataFacture } from '../../services/search/SearchFactura';



export default function ViewAllDataFacture(props: recivedNumberFacture) {

    const [factureAll, setFactureAll] = useState<RegisterOk>(new RegisterOk)

    useEffect(() => {
        
        getAllDataFacture(props.number).then(data =>{
            setFactureAll(data)
            
        })

    }, [])

    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }} > 
     
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <Avatar
                    alt="Logo de la empresa"
                    src={factureAll?.company.url_logo}
                    sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <Typography variant="h4" component="h1">
                    Factura
                </Typography>
            </Box>

            {/* Sección de datos */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        <strong>Número de Factura:</strong> 001
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        <strong>Fecha:</strong> 10/10/2023
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        <strong>Cliente:</strong> Juan Pérez
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        <strong>Total:</strong> $100.00
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
