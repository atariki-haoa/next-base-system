import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Avatar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '@/redux/slices/sessionSlice';
import { useRouter } from 'next/router';
import { Home, Business, People, Note, Money, Alarm } from '@mui/icons-material';

const routes = [
    { path: '/dashboard/home', name: 'Inicio', icon: <Home /> },
    { path: '/dashboard/states', name: 'Propiedades', icon: <Business /> },
    { path: '/dashboard/clients', name: 'Clientes', icon: <People /> },
    { path: '/dashboard/contracts', name: 'Contratos', icon: <Note /> },
    { path: '/dashboard/users', name: 'Usuarios', icon: <People /> },
    { path: '/dashboard/alarms', name: 'Alarmas', icon: <Alarm /> },
    { path: '/dashboard/finance', name: 'Financiero', icon: <Money /> },
    // Agrega aquí más rutas según sea necesario
];

const Menu = () => {
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
};

export default Menu;
