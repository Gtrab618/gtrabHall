import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { swichInterface } from '../interfaces/swichInterface';

const mainListItems = [
  { text: 'Crear Factura', icon: <NoteAddIcon /> },
  { text: 'Ver facturas', icon: <VisibilityIcon /> },
];



export default function MenuContent(props: swichInterface) {

  const [timeLeft, setTimeLeft] = useState(0);
  const [select, setSelected] = useState(0);

  useEffect(() => {
    const expirationTime = localStorage.getItem("timeExpi")

    if (!expirationTime) {
      const newExpiration = Date.now() + 60 * 60 * 1000; // 1 hora en milisegundos
      localStorage.setItem("timeExpi", newExpiration.toString());
      setTimeLeft(60 * 60);
    } else {

      const timeRemaining = Math.floor((+expirationTime - Date.now()) / 1000);
      setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);

    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === select} onClick={() => { setSelected(index); props.interfaceSelected(item.text) }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <h3>Tiempo restante:{formatTime(timeLeft)}</h3>
    </Stack>

  );
}
