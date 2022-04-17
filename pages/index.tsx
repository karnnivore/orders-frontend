import Head from 'next/head'
import { Container } from '@mui/material'
import { Orders } from './orders'

export default function Home() {
  return (
    <div className="container">
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
      
      <Container>
        <main>
          <div className="grid">
            <Orders/>
          </div>
        </main>
      </Container>
    </div>
  )
}
