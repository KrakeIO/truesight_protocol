import {
  Grid,
  Typography,
  Button,
  FilledInput,
  Input,
  TextField,
} from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import logo from '../Assets/logo1.svg'
import '../App.css'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { v4 as uuidv4 } from 'uuid'
import CircularProgress from '@mui/material/CircularProgress'

import Connect2Phantom from './Connect2Phantom'

const useStyles = makeStyles({
  Headcontainer: {
    padding: '2vh',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    height: '5vh',
  },
  Button: {
    borderColor: '#f05f18 !important',
    color: '#f05f18 !important',
  },
  bodyContainer: {
    marginTop: '12vh',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
  },
  input: {
    height: '4vh !important',
    width: '12vw !important',
    marginBottom: '1.56vh !important',
    borderRadius: '0.6vh !important',
    borderColor: '#fff !important',
    backgroundColor: '#fff !important',
    padding: '1vh',
  },
  inputProps: {
    padding: '1vh 1vw !important',
    lineHeight: '3.12vh !important',
    color: '#000',
  },
  title: {
    fontSize: '4vh !important',
    fontWeight: '600 !important',
    color: '#fff',
    // textAlign:'center !important'
  },
  bodytext: {
    fontSize: '2.56vh !important',
    color: '#fff',
    margin: '0vh 2vh !important',
  },
  textcontainer: {
    marginTop: '4vh',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radiobutton: {
    borderColor: '#fff !important',
  },
  RadioGroup: {
    margin: '2vh 0vh !important',
  },
  datePicker: {
    borderColor: '#fff !important',
  },
  submitButton: {
    backgroundColor: '#f05f18 !important',
    margin: '4vh 0vw !important',
  },
  dateinput: {
    borderRadius: '0.6vh !important',
    // borderColor: '#fff !important',
    backgroundColor: '#fff !important',
    padding: '1vh',
  },
  dateinputProps: {
    padding: '1vh 1vw !important',
    lineHeight: '3.12vh !important',
    color: '#000',
  },
})

export default function Welcome() {
  const [details, setDetails] = useState({
    stake: '',
    predict: '',
    reach: '',
    error: '',
    pubKey: '',
  })

  const [isConnected, setConnected] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = React.useState('ondate')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const [date, setDate] = React.useState(new Date())

  const handleDate = (newValue) => {
    setDate(newValue)
  }

  const classes = useStyles()
  const handleConnect = () => {}

  const updateIsConnected = (isConnected, pubKey) => {
    setConnected(isConnected)
    setDetails({ ...details, pubKey: pubKey })
  }
  const handleSubmit = () => {
    if (!isConnected) {
      alert('please connect ur wallet')
      return
    }

    setLoading(true)

    const predection_record = {
      wallet_id: details.pubKey,
      stake_amount: details.stake,
      symbol: details.predict,
      price_during_prediction: 144.34,
      price_predicted: details.reach,
      price_direction_from_current: 'U',
      price_validation_type: 'B',
      validate_price_on: date.toLocaleDateString(),
      prediction_blockchain_reference: uuidv4(),
      validation_status: 'N',
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(predection_record),
      redirect: 'follow',
    }
    fetch(
      'http://ec2-3-110-171-133.ap-south-1.compute.amazonaws.com/api/v1/predictions',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        alert('Record Submitted Successfully.')
      })
      .catch((error) => {
        setLoading(false)
        alert(error.message)
        console.log(error, 'Error occured')
      })
  }
  return (
    <div className="view-wrapper">
      <Grid className={classes.Headcontainer} container>
        <Grid container className={classes.logoContainer} xs={6}>
          <img className={classes.logo} src={logo} alt={'truesight'} />
        </Grid>
        <Grid item={true} container xs={6} justifyContent="flex-end">
          <Connect2Phantom setIsConnected={updateIsConnected} />
        </Grid>
      </Grid>
      <Grid container className={classes.bodyContainer}>
        <Typography className={classes.title}>Add a Signal</Typography>
        <Grid container className={classes.textcontainer}>
          <Typography className={classes.bodytext}> I stake </Typography>
          <Input
            fullWidth="true"
            type="number"
            disableUnderline="true"
            value={details.stake}
            placeholder="Stake"
            onChange={(e) => setDetails({ ...details, stake: e.target.value })}
            inputProps={{
              className: classes.inputProps,
            }}
            className={classes.input}
            endAdornment={<InputAdornment position="end">TSD</InputAdornment>}
          />
          <Typography className={classes.bodytext}>to predict that</Typography>
        </Grid>
        <Grid container className={classes.textcontainer}>
          <Input
            type="email"
            disableUnderline="true"
            value={details.predict}
            placeholder="AAPL"
            onChange={(e) =>
              setDetails({ ...details, predict: e.target.value })
            }
            inputProps={{
              className: classes.inputProps,
            }}
            className={classes.input}
            endAdornment={
              <InputAdornment position="start">$142</InputAdornment>
            }
          />
          <Typography className={classes.bodytext}> will reach </Typography>
          <Input
            type="number"
            disableUnderline="true"
            value={details.reach}
            placeholder="0"
            onChange={(e) => setDetails({ ...details, reach: e.target.value })}
            inputProps={{
              className: classes.inputProps,
            }}
            className={classes.input}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <Typography className={classes.bodytext} style={{ color: '#707070' }}>
            <ArrowDropDownIcon /> 19.7
          </Typography>
        </Grid>
        <FormControl className={classes.RadioGroup}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            className={classes.radiobutton}
            sx={{
              color: '#fff !important',
            }}
          >
            <FormControlLabel
              value="ondate"
              control={<Radio style={{ color: '#fff' }} />}
              label="on the date of"
            />
            <FormControlLabel
              value="range"
              control={<Radio style={{ color: '#fff' }} />}
              label="between now and"
            />
          </RadioGroup>
        </FormControl>

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          sx={{ color: '#fff !important' }}
        >
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={handleDate}
            renderInput={(params) => (
              <TextField
                className={classes.dateinput}
                inputProps={{ className: classes.dateinputProps }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={() => handleSubmit()}
        >
          {!isLoading ? (
            <span>Submit Signal</span>
          ) : (
            <>
              <CircularProgress color="inherit" size="1rem" />
            </>
          )}
        </Button>
      </Grid>
    </div>
  )
}
