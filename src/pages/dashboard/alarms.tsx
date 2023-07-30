// pages/dashboard/home.tsx
import { Box, Typography } from '@mui/material'
import Layout from '../../components/common/Layout';
import withAuth from '@/hoc/withAuth';

const Alarm = () => {
  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" mb={2}>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1">
          This is the home page of the dashboard.
          asdasdasdasdasd
        </Typography>
      </Box>
    </Layout>
  )
}

export default withAuth(Alarm)
