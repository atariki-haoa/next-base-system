// components/Footer.tsx
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box mt={5} py={3} bgcolor="primary.main" color="white">
      <Typography variant="body1" align="center">
        © 2023 My Dashboard. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
