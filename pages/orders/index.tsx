import { Paper } from "@mui/material"
import { useState } from "react"
import { AllOrders } from "../../components/orders/AllOrders"
import { OrderFilters } from "../../components/orders/OrderFilters"
import { IFilters } from "../../models/IFilters"
import { IOrders } from "../../models/IOrders"
import data from './orders.json'

const orders = data.orders 

export default function Orders() {
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