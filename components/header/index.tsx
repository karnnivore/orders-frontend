import Image from 'next/image'
import styles from './css/header.module.css'

export const Header = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <a href="https://boxhub.com/" target="_blank">
            <Image
              src='/boxhub.svg'
              height='24px'
              width='137px'
            />
          </a>
        </div>
      </div>
    </>
  )
}