import React, { MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { logout } from '@/redux/slices/sessionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Home,
} from '@mui/icons-material';
import { RootState } from '../../redux/store';

const routes = [
  { path: '/home', name: 'Inicio', icon: <Home /> },
  // Agrega aquí más rutas según sea necesario
];

function Menu() {
  const user = useSelector((state: RootState) => state.session.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement,
        MouseEvent>, path: string) => {
    router.push(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{user?.name[0] || 'U'}</Avatar>
        {user && (
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          {user.name}
        </Typography>
        )}
        {routes.map((route, i) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            color="inherit"
            startIcon={route.icon}
            onClick={(event: any) => handleListItemClick(event, route.path)}
          >
            {route.name}
          </Button>
        ))}
        <Button color="inherit" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
