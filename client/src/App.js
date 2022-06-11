import './App.css'
import Welcome from './Components/Welcome'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './Theme'
import Connect2Phantom from './Components/Connect2Phantom'
// import Connect2Phantom from './Components/Connect2Phantom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Welcome />
      </div>
    </ThemeProvider>
  )
}

export default App
