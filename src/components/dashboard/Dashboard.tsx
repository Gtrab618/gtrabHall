import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import ViewFacturas from './components/options/ViewFacturas';
import ViewAllDataFacture from '../sign-in/viewAllDataFacture';
import { useEffect, useState } from 'react';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {

  const [tipeInterface, setTipeInterface] = useState('Crear Factura')
  const [numberFacture, setNumberFacture] = useState('')

  const switchInterface = (interSwitch: string) => {


    setTipeInterface(interSwitch)

  }

  const seeAllDataFacture = (number:string)=>{

    setNumberFacture(number)

  }


  useEffect(() => {
   
    if(numberFacture !==""){
      setTipeInterface("Ver allData")
    }

  }, [numberFacture])

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>

        {/* seleccionar interfaz  */}
        <SideMenu interfaceSelected={switchInterface} />

        <AppNavbar interfaceSelected={switchInterface} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />


            {/* aqui se pone para que se muestre las diferentes interfaces del dashboard */}
            {tipeInterface === "Crear Factura" && <MainGrid getNumberFacture={seeAllDataFacture} />}
            {tipeInterface === "Ver facturas" && <ViewFacturas getNumberFacture={seeAllDataFacture}  />}
            {tipeInterface === "Ver allData" && <ViewAllDataFacture number={numberFacture}  />}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
