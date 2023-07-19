import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import Image from "next/image"
import Account from '../components/Account'
import BABTokenWeekGate from '../components/BABTokenWeekGate'
import styles from '../styles/Home.module.css'
import iconExport from "../images/export.svg"
import LendingProtocol from '../components/lendingProtocol'
import React from 'react'

function Page() {
  const [value, setValue] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [kyc, setKYC] = useState(false)

  const { isConnected } = useAccount()

    const handleDeposit = (amount: number) => {
        // Handle deposit here
        console.log(`Depositing ${amount}`);
    };

    const handleBorrow = (amount: number) => {
        // Handle borrow here
        console.log(`Borrowing ${amount}`);
    };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      </header>

      <main className={styles.main}>

        <h1 className={styles.title}>UnderCat or OverCat?</h1>

        <div className={styles.input_box}>
          <input
            className={styles.input}
            placeholder='enter address'
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value.trim())
            }}
          ></input>
          <button
            className={styles.button}
            disabled={loading}
            onClick={() => {
              if (value !== address) {
                setLoading(true)
                setAddress(value)
                setShowGate(true)
              }
            }}
          >
            Check
          </button>
        </div>

        <BABTokenWeekGate
          address={address}
          loading={loading}
          setLoading={setLoading} 
          setKYC={setKYC}
          />

        {!kyc ?
        <div>
              <h1>Cat says over</h1>
        </div> :
        <div>
          <div className={styles.appPlaceholder}>
            <h2 className={styles.appTitle}>Lending Protocol dApp</h2>
          </div>
          <div>
            <div>
              <h1>Cat says under Lending Protocol</h1>
              <LendingProtocol onDeposit={handleDeposit} onBorrow={handleBorrow} />
            </div>
          </div>
        </div>
        }
      </main>

      <footer className={styles.footer}>
        <ConnectKitButton />
        {isConnected && <Account />}
      </footer>
    </div>
  )
}


export default Page
