import React from 'react'
import logo from '../Assets/logo.svg'
import { makeStyles } from '@mui/material';

const useStyles = makeStyles({
  root:{
    minheight:"8.59375vh !important",
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: '3.90vh',
  },
  
});

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <img className={classes.logo} src={logo} alt={"truesight"} />
    </>

  )
}
