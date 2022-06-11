import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color:'#000'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          color:'#000'
        }
      }
    },
    MuiTextField:{
      styleOverrides:{
        root:{
          // border:'1px solid #fff'
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
          color:'#000'
        }
      }
    }
  }
})