import { Backdrop, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  isLoading: boolean
}

export function Loading({ isLoading }: Props) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column' }}
      open={isLoading}
    >
      <CircularProgress color="success" />
      <Typography mt={2} fontWeight="bold" textAlign="start">
        Carregando
      </Typography>
    </Backdrop>
  )
}