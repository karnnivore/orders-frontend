import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { AllOrders } from "../../components/orders/AllOrders"
import { OrderFilters } from "../../components/orders/OrderFilters"
import { IFilters } from "../../models/IFilters"
import { IOrders } from "../../models/IOrders"
import data from './orders.json'

export default function Orders() {
  const [orderData, setOrderData] = useState<IOrders[]>([])
  const [filters, setFilters] = useState<IFilters>({
    status: '',
    size: '',
    condition: '',
    type: ''
  })
  const [loaded, setLoaded] = useState(false)

  // fetch data from api
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('http://localhost:8081/orders', requestOptions)
      .then(response => response.json())
      .then((data: IOrders[]) => {
        setOrderData(data)
        setLoaded(true)
        console.log('data loaded: ', data)
      })
  }, [])

  return (
    <Paper>
      {loaded ?
        <>
          <OrderFilters data={orderData} filters={filters} setFilters={setFilters}/>
          <AllOrders orderData={orderData} filters={filters}/>
        </>
      :
        <>
          <h2>Loading</h2>
        </>
      }
    </Paper>
  )
}