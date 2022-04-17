import { useEffect, useState } from "react"
import styles from './css/StatusBadge.module.css'

interface IStatusBadge {
  status: string
}

interface IStatusObj {
  color: string
  text: string
}

export const StatusBadge = (props: IStatusBadge) => {
  const [statusObj, setStatusObj] = useState<IStatusObj>({
    color: '',
    text: ''
  })

  // function to set status object 
  const calcStatus = (status: string) => {
    let tempObj = {
      color: '',
      text: ''
    }
    if (status === 'in-progress') {
      tempObj.color = '#FEC62E'
      tempObj.text = 'In Progress'
    }
    if (status === 'delivered') {
      tempObj.color = '#15D115'
      tempObj.text = 'Delivered'
    } 
    if (status === 'pending') {
      tempObj.color = '#19F0D0'
      tempObj.text = 'Pending'
    }
    setStatusObj(tempObj)
  }

  useEffect(() => {
    calcStatus(props.status)
  }, [props])

  return (
    <>
      <div className={styles.statusContainer} style={{background: `${statusObj.color}`}}>
        <span>{statusObj.text}</span>
      </div>
    </>
  )
  
}