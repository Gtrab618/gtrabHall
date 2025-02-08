import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from './MenuContent';
import { swichInterface } from '../interfaces/swichInterface';
import { removeCookie } from '../../../services/PayloadFacService';
import { useNavigate } from 'react-router-dom';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

interface fussion extends swichInterface,SideMenuMobileProps{

}


export default function SideMenuMobile({ open, toggleDrawer, interfaceSelected }: fussion) {
  const navigate = useNavigate();
  
  const redirectLogin =()=>{
    removeCookie()
    navigate("/")

  }
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent interfaceSelected={interfaceSelected}/>
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={redirectLogin }>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
