import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useState } from 'react';
import { swichInterface } from '../interfaces/swichInterface';

const mainListItems = [
  { text: 'Crear Factura', icon: <NoteAddIcon/> },
  { text: 'Ver facturas', icon: <VisibilityIcon /> },
  
];



export default function MenuContent(props:swichInterface) {

  const [select, setSelected] = useState(0);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === select}  onClick={() => {setSelected(index); props.interfaceSelected(item.text)}}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
   
    </Stack>
  );
}
