import { Container, Paper, Typography } from "@mui/material"
import { useState } from "react"
import { AllOrders, IOrders } from "./components/AllOrders"
import { OrderFilters } from "./components/OrderFilters"
import data from './orders.json'

const orders = data.orders 

export interface IFilters {
  status: string
  size: string
  condition: string
  type: string
}

export const Orders = () => {
  const [orderData, setOrderData] = useState<IOrders[]>(orders)
  const [filters, setFilters] = useState<IFilters>({
    status: '',
    size: '',
    condition: '',
    type: ''
  })

  return (
    <Paper>
      <OrderFilters data={orderData} filters={filters} setFilters={setFilters}/>
      <AllOrders orderData={orderData} filters={filters}/>
    </Paper>
  )
}