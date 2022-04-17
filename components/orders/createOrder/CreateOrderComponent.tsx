import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { IOrders } from "../../../models/IOrders"
import styles from "../css/CreateOrderComponent.module.css"

export const CreateOrderComponent = () => {
  const [newOrder, setNewOrder] = useState<IOrders>({
    id: 'sfs',
    created: 'sfsf',
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

  const generateUniqueID = () => {

  }

  const generateDate = () => {

  } 

  const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOrder({
      ...newOrder,
      [field]: event.target.value
    })
    console.log(newOrder)
  }

  const handleSubmit = () => {
    // check if any fields are empty
    console.log(newOrder)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }
    fetch('http://localhost:8081/createOrder', requestOptions)
      .then(response => console.log(response))
      .then(data => {
        console.log(data)
      })

  }
  
  return(
    <Paper>
      <Container sx={{padding: 2}}>
        <Typography variant="h2">
          Create an Order
        </Typography>
        <Box
          component='form'
          noValidate
          autoComplete='off'
        >
          <div className={styles.formContainer}>
            <TextField 
              id="standard-basic" 
              variant="outlined" 
              disabled 
              fullWidth 
              value={newOrder.id}
              sx={{marginTop: 2, marginBottom:2}}
            />
            <TextField 
              variant="outlined" 
              disabled 
              fullWidth 
              value={newOrder.created}
              sx={{marginBottom:2}}
            />
            <TextField 
              variant="outlined" 
              label="Status" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.status}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("status", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Customer" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.customer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("customer", e)}}
            />
            <TextField 
              variant="outlined" 
              label="SKU" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.sku}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("sku", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Photo" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.photo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("photo", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Condition" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.condition}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("condition", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Size" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.size}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("size", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Type" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("type", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Origin Address" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.origin_address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("origin_address", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Shipping Address" 
              fullWidth 
              sx={{marginBottom:2}}
              value={newOrder.shipping_address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("shipping_address", e)}}
            />
          </div>
          <div className={styles.btnContainer}>
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </Box>
      </Container>
    </Paper>
  )
}