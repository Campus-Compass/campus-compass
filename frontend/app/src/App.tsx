import React from 'react'
import './App.css'
import Routes from './routes'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  typography: {
    body1: {
      lineHeight: 1.4,
      fontSize: 21,
      fontWeight: 300
    },
    body2: {
      lineHeight: 1.4,
      fontSize: 18,
      fontWeight: 300
    },
    h5: {
      fontWeight: 500
    }
  }
})

theme = responsiveFontSizes(theme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <header className='App-header'>
          <Routes />
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
