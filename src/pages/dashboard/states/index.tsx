// pages/dashboard/home.tsx
import { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid';
import Layout from '@/components/common/Layout'
import axios from 'axios'
import withAuth from '@/hoc/withAuth';
import { NextPage } from 'next';
import { useRouter } from 'next/router'

const DataTable = styled('div')({
  height: 400,
  width: '100%'
});

const State: NextPage = () => {
  const [states, setStates] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedState, setSelectedState] = useState(0)
  const router = useRouter()

  useEffect(() => {
      const getStates = async () => {
        const res = await axios.get('/api/states')
        const fixed = res.data.map((state: any) => {
          const { owner }  = state;
          return {
            id: state.id,
            region: state.region,
            commune: state.commune,
            owner: `${owner.firstName} ${owner.lastName} ${owner.secondLastName}`,
            price: state.price,
            priceM2: state.priceSquareMeter,
            surface: state.totalSurface,
            typology: state.typology,
            parkingStorage: state.parkingStorage,
            status: state.status,
            rol: state.rol,
            contractStart: state.contractStart,
            contractEnd: state.contractEnd,
            fines: state.fines,
            commission: state.commission,
            warranty: state.warranty,
            tenant: state.tenant?.name,
          }
        });
        setStates(fixed);
      }
      getStates();
  }, [])

  const handleDelete = () => {
    // Handle delete action here
    setOpen(false)
  }

  const columns = [
    { field: 'region', headerName: 'Región', width: 150 },
    { field: 'commune', headerName: 'Comuna', width: 150 },
    { field: 'owner', headerName: 'Propietario', width: 150 },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'priceM2', headerName: 'Precio M2', width: 100, hide: true },
    { field: 'surface', headerName: 'Superficie', width: 100 },
    { field: 'typology', headerName: 'Tipología', width: 100, hide: true },
    { field: 'parkingStorage', headerName: 'Estacionamiento y Bodega', width: 130, hide: true },
    { field: 'status', headerName: 'Estado', width: 130 },
    { field: 'rol', headerName: 'Rol', width: 130, hide: true },
    { field: 'contractStart', headerName: 'Inicio Contrato', width: 130 },
    { field: 'contractEnd', headerName: 'Fin Contrato', width: 130, hide: true },
    { field: 'fines', headerName: 'Multas', width: 130, hide: true },
    { field: 'commission', headerName: 'Comisión', width: 130, hide: true },
    { field: 'warranty', headerName: 'Garantía', width: 130, hide: true },
    { field: 'tenant', headerName: 'Arrendatario', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params: any) => (
        <>
          <Button sx={{ mr: 1 }} variant="contained" color="success" onClick={() => handleEdit(params.row.id)}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteDialogOpen(params.row.id)}>
            Borrar
          </Button>
        </>
      )
    }
  ]

  const handleDeleteDialogOpen = (id: number) => {
    setSelectedState(id)
    setOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setOpen(false)
  }

  const handleEdit = (id: number) => {
    // Handle edit action here
  }

  const addState = () => {
    router.push('/dashboard/states/new')
  };

  return (
    <Layout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">
            Propiedades
          </Typography>
          <Button variant="contained" color="primary" onClick={addState}>
            Agregar Propiedad
          </Button>
        </Box>
        <DataTable>
          <DataGrid
            rows={states}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            density="standard"
            autoHeight={true}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: true,
                  region: true,
                  commune: true,
                  owner: true,
                  price: true,
                  priceM2: true,
                  surface: true,
                  typology: false,
                  parkingStorage: false,
                  status: true,
                  rol: false,
                  contractStart: false,
                  contractEnd: false,
                  fines: false,
                  commission: false,
                  warranty: false,
                  tenant: true,
                },
              },
            }}
          />
        </DataTable>
        <Dialog
          open={open}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Está seguro de borrar esta propiedad?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta accion no puede ser revertida.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  )
}

export default withAuth(State)
