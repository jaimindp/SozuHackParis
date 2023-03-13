import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import BABTokenWeekGate from './BABTokenWeekGate';
import Image from "next/image";
import iconExport from "./images/export.svg";


const Home: NextPage = () => {
  const [value, setValue] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGate, setShowGate] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>KNOWYOURCAT</title>
        <meta name="title" content="KnowYourCat ID | multichain NFT aggregator for you digital reputation"></meta>
        <meta
          content="Mutatable KnowYourCat SBT store verification, reputation, and other credentials that you have completed on web3 platforms."
          name="description"
        />
      </Head>

      <header className={styles.header}>
        <a
          href={`https://github.com/KnowYourCat/knowyourcat-categoryUI-demo`}
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Github <Image src={iconExport} alt="icon export" />
        </a>
      </header>

      <main className={styles.main}>

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

        {showGate &&
          <BABTokenWeekGate
            address={address}
            loading={loading}
            setLoading={setLoading} />
        }

      </main>

      <footer className={styles.footer}>
        <ConnectButton />
      </footer>
    </div>
  );
};

export default Home;
