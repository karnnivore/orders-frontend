import Head from 'next/head'
import { Container } from '@mui/material'
import Orders from './orders'
import styles from './home.module.css'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className={`container ${styles.mainContainer}`}>
      <Head>
        <title>Boxhub | All Orders</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      
      <Header/>
      <Container>
        <main className={styles.contentContainer}>
          <div className={styles.homeContainer}>
            <Orders/>
          </div>
        </main>
      </Container>
      <Footer/>
    </div>
  )
}
