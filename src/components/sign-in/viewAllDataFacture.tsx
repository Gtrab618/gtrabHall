
import { Paper, Box, Avatar, Divider, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { recivedNumberFacture } from '../models/other/interfaceOther';
import { useEffect, useState } from 'react';
import { RegisterOk } from '../models/savedFactura/registerOk';
import { getAllDataFacture, getPdfBase64 } from '../../services/search/SearchFactura';
import Grid from '@mui/material/Grid2';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LanguageIcon from '@mui/icons-material/Language';
import { PdfBase } from '../models/other/pdfBase';

export default function ViewAllDataFacture(props: recivedNumberFacture) {

    const redirect = () =>{
        window.open(factureAll?.bill.qr, "_blank");
    }

    const [factureAll, setFactureAll] = useState<RegisterOk>(new RegisterOk)

    const downloadFacture = () => {
        getPdfBase64(props.number).then((data: PdfBase) => {
            const byteCharacters = atob(data.pdf_base_64_encoded); // Decodificar Base64
            const byteNumbers = new Array(byteCharacters.length);
    
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
    
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const anchorElement = document.createElement("a");
            anchorElement.href = pdfUrl;
            anchorElement.download = `${data.file_name || "factura"}.pdf`; // Nombre con fallback
            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
    
            // Liberar memoria
            URL.revokeObjectURL(pdfUrl);
        }).catch(error => {
            console.error("Error al descargar la factura:", error);
        });
    };
    useEffect(() => {

        getAllDataFacture(props.number).then(data => {
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
            <Avatar
                alt="Qr"
                src={factureAll?.bill.qr_image}
                variant="square"
                sx={{ width: 120, height: 120, marginRight: 2, marginBottom: 4 }}
            />
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 6, md: 6 }} >
                    <Typography variant="body1">
                        <strong>Compañía:</strong> {factureAll?.company.company}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 6 }} >
                    <Typography variant="body1">
                        <strong>Dirección:</strong> {factureAll?.company.direction}
                    </Typography>
                </Grid>



            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Typography variant="body1">
                        <strong>Cliente:</strong> {factureAll?.customer.names}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Typography variant="body1">
                        <strong>Email:</strong> {factureAll?.customer.email}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Typography variant="body1">
                        <strong>Identificación:</strong> {factureAll?.customer.identification}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Typography variant="body1">
                        <strong>Número de factura:</strong> {factureAll?.bill.number}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Typography variant="body1">
                        <strong>Fecha de creación:</strong> {factureAll?.bill.created_at}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Button variant="outlined" startIcon={<CloudDownloadIcon />} onClick={downloadFacture}>
                        Descargar Factura
                    </Button>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 3 }} >
                    <Button variant="outlined" startIcon={<LanguageIcon />} onClick={redirect}>
                        Ver en GOV.CO
                    </Button>
                </Grid>
            </Grid>

        </Paper>
    );
}
