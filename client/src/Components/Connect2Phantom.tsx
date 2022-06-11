import * as React from 'react'
import { useEffect, useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import Chip from '@mui/material/Chip'

type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged'

interface ConnectOpts {
  onlyIfTrusted: boolean
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, callback: (args: any) => void) => void
  isPhantom: boolean
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider
}

const useStyles = makeStyles({
  Button: {
    borderColor: '#f05f18 !important',
    color: '#f05f18 !important',
  },
  Text: {
    color: 'white',
  },
  Anchor : {
    textDecoration : 'none',
    "&:hover": {
      cursor : 'pointer',
    },
  }
})

export default function Connect2Phantom({setIsConnected} : {setIsConnected : any}) {
  const classes = useStyles()
  const [walletAvail, setWalletAvail] = useState(false)
  const [provider, setProvider] = useState<PhantomProvider | null>(null)
  const [connected, setConnected] = useState(false)
  const [pubKey, setPubKey] = useState<PublicKey | null>(null)

  useEffect(() => {
    if ('solana' in window) {
      const solWindow = window as WindowWithSolana
      if (solWindow?.solana?.isPhantom) {
        console.log('provider and wallet available...')
        setProvider(solWindow.solana)
        setWalletAvail(true)
        // Attemp an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true })
      }
    }
  }, [])

  useEffect(() => {
    provider?.on('connect', (publicKey: PublicKey) => {
      console.log(`connect event: ${publicKey}`)
      setConnected(true)
      setPubKey(publicKey)
      setIsConnected(true, publicKey?.toBase58())
    })
    provider?.on('disconnect', () => {
      console.log('disconnect event')
      setConnected(false)
      setPubKey(null)
      setIsConnected(false, null)
    })
  }, [provider])

  const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    console.log(`connect handler`)
    provider?.connect().then().catch((err) => {
      console.error('connect ERROR:', err)
    })
  }

  const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    console.log('disconnect handler')
    provider
      ?.disconnect()
      .then((d) => {
        console.log(d, 'disconnected')
      })
      .catch((err) => {
        console.error('disconnect ERROR:', err)
      })
  }

  return (
    <div>
      {walletAvail ? (
        <>
          {!connected ? (
            <Button
              variant="outlined"
              className={classes.Button}
              onClick={connectHandler}
            >
              Connect Wallet
            </Button>
          ) : (
            <div>
              <Chip label={pubKey?.toBase58()} color="primary" />
              <Button
                variant="outlined"
                className={classes.Button}
                onClick={disconnectHandler}
              >
                Disconnect
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <a href="https://phantom.app/" className={classes.Anchor}>
            {' '}
            <Chip label="Phantom is not available. Go get it" color="warning" />
          </a>
        </>
      )}
    </div>
  )
}

// export default Connect2Phantom
