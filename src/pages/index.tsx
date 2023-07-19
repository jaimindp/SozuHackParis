import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Image from "next/image"
import Account from '../components/Account'
import BABTokenWeekGate from '../components/BABTokenWeekGate'
import styles from '../styles/Home.module.css'
import iconExport from "../images/export.svg"
import LendingProtocol from '../components/lendingProtocol'
import React from 'react'
import { Antibot } from  'zkme-antibot-component';
import dynamic from 'next/dynamic'

const ZKMeAntiBotComponent = dynamic(
  () => import('zkme-antibot-component'),
  { ssr: false }
)


function Page() {
  const [value, setValue] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [kyc1, setKYC1] = useState(false)
  const [kyc2, setKYC2] = useState(false)
  const [isOpen, setIsOpen] = useState(true);
  const verifySuccess = (response) => {
    console.log(response); //print out the face image in base64 code
    setIsOpen(false); //close the popup window
  };


  useEffect(() => {
    if (address) {
      console.log('Address is: ', address);
      // Add your logic here
      setAddress(address)
    }
  }, [address]);

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

        <h1 className={styles.title}>L'UnderChat or OverChat?</h1>

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
          setKYC={setKYC1}
          />
          <LendingProtocol onDeposit={handleDeposit} onBorrow={handleBorrow} under={kyc1} />
    </main>
      <footer className={styles.footer}>
        <ConnectKitButton />
        {isConnected && <Account { ...setAddress }/>}
      </footer>
    </div>
  )
}

export default Page
