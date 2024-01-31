import { useState } from 'react'
import { Login } from './screens/Login'
import { ThemeProvider } from '@mui/material'
import { theme } from './styled'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  )
}

export default App
