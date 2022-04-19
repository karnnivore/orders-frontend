import { Container } from '@mui/material'
import Image from 'next/image'
import styles from './css/footer.module.css'

export const Footer = () => {
  return(
    <>
      <div className={styles.footerContainer}>
        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
          <div className={styles.footerLogo}>
            <a href='https://boxhub.com/' target='_blank'>
              <Image
                src='/boxhubLight.svg'
                height='24px'
                width='137px'
              />
            </a>
          </div>
          <div className={styles.infoContainer}>
            Created by:&nbsp;
            <a href='https://www.nickchinsen.com/' target='_blank'>
              Nick Chinsen
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}