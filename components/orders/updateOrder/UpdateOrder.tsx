import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTransformToUpper } from "../../../hooks/useTransformToUpper"
import { IOrders } from "../../../models/IOrders"
import styles from '../css/UpdateOrder.module.css'

interface IUpdateOrder {
  open: boolean
  handleUpdateClose: () => void
  order: IOrders
}
export const UpdateOrder = ({
  open,
  handleUpdateClose,
  order
}: IUpdateOrder) => {
  const [updatedOrder, setUpdatedOrder] = useState<IOrders>({
    id: '',
    created: '',
    status: '',
    customer: '',
    sku: '',
    photo: '',
    condition: '',
    size: '',
    type: '',
    origin_address: '',
    shipping_address: ''
  })

  // set order to update on row change
  useEffect(() => {
    setUpdatedOrder(order)
  }, [order])
  // styles for modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  // handle field change
  const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedOrder({
      ...updatedOrder,
      [field]: event.target.value
    })
  }

  // handle submit
  const handleSubmit = () => { 
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrder)
    }
    fetch('http://localhost:8081/update', requestOptions)
      .then(response => console.log(response))
      .then(data => {
        console.log(data)
      })
  }

  return(
    <Modal
      open={open}
      onClose={handleUpdateClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant="h4" sx={{marginLeft: 2, marginBottom: 2}}>
          Update Order: {order.id}
        </Typography>
        <div className={styles.formInputs}>
          <TextField
            id="standard-basic"
            variant="outlined"
            label="ID"
            disabled
            value={updatedOrder.id}
            sx={{margin:1, marginBottom:2, marginLeft:2}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Created"
            disabled
            value={updatedOrder.created}
            sx={{margin:1, marginBottom:2}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Status"
            value={useTransformToUpper(updatedOrder.status)}
            sx={{margin:1, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("status", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Customer"
            value={updatedOrder.customer}
            sx={{margin:1, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("customer", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="SKU"
            fullWidth
            value={updatedOrder.sku}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("sku", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="photo"
            fullWidth
            value={updatedOrder.photo}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("photo", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Condition"
            value={useTransformToUpper(updatedOrder.condition)}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("condition", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Size"
            value={updatedOrder.size}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("size", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Type"
            value={useTransformToUpper(updatedOrder.type)}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("type", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Origin Address"
            fullWidth
            value={updatedOrder.origin_address}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("origin_address", e)}}
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            label="Shipping Address"
            fullWidth
            value={updatedOrder.shipping_address}
            sx={{margin:2, marginBottom:2}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("shipping_address", e)}}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button 
            variant='contained'
            color='warning'
            sx={{marginRight:2}}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button 
            variant='outlined'
            onClick={handleUpdateClose}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  )
}