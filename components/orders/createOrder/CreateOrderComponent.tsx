import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { IOrders } from "../../../models/IOrders"
import styles from "../css/CreateOrderComponent.module.css"
import { useRouter } from 'next/router'

export const CreateOrderComponent = () => {
  const [newOrder, setNewOrder] = useState<IOrders>({
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
  // next router
  const router = useRouter()

  // Automatically set date to today
  useEffect(() => {
    setNewOrder({
      ...newOrder,
      created: generateDate()
    })
  }, [])

  const generateDate = () => {
    const date = new Date()
    return[
      date.getFullYear(),
      padDigits(date.getMonth() + 1),
      padDigits(date.getDate(),)
    ].join('-')
  } 

  function padDigits(num) {
    return num.toString().padStart(2, '0');
  }

  // Update order object
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
    fetch('http://localhost:8081/create', requestOptions)
      .then(response => {
        console.log(response)
        router.push('/')
      })
      .then(data => {
        console.log(data)
      })

  }
  
  return(
    <Paper elevation={8}>
      <Container sx={{padding: 2, marginTop: 4}}>
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
              label="ID"
              fullWidth 
              value={newOrder.id}
              sx={{marginTop: 2, marginBottom:2}}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("id", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Created"
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
              sx={{marginBottom:2, marginRight: 7}}
              value={newOrder.condition}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange("condition", e)}}
            />
            <TextField 
              variant="outlined" 
              label="Size" 
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
            <Link
              href={{
                pathname:'/'
              }}
            >
              <Button 
                variant="outlined"
                sx={{marginRight: 2}}
              >
                Cancel
              </Button>
            </Link>
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