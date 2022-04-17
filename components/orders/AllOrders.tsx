import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { OrderRow } from './OrderRow'
import { IFilters } from '../../models/IFilters'
import { UpdateOrder } from './updateOrder/UpdateOrder'
import { IOrders } from '../../models/IOrders'
import styles from './css/AllOrders.module.css'

interface IAllOrders {
  orderData: IOrders[]
  filters: IFilters
}

export const AllOrders = ({
  orderData,
  filters
}: IAllOrders) => {
  const [filteredData, setFilteredData] = useState<IOrders[]>(orderData)
  // pagination 
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [emptyRows, setEmptyRow] = useState(0)
  // state for update modal
  const [open, setOpen] = useState(false)
  const handleUpdateOpen = () => setOpen(true)
  const handleUpdateClose = () => setOpen(false)

  // filter data
  useEffect(() => {
    console.log('filters: ', filters)
    // If filters are empty reset to base data
    if (filters.status === '' && filters.status === '' && filters.condition === '' && filters.type === '') {
      setFilteredData(orderData)
    } else {
      let tempData = orderData.filter(order => {
        for (var key in filters) {
          if(filters[key] !== '')
            if(order[key] === undefined || order[key] != filters[key])
              return false
        }
        return true
      })
      setFilteredData(tempData)
    }
  }, [filters])

  // Sort data by date created initially
  useEffect(() => {
    let sortedOrders = orderData
    sortedOrders.sort((a, b) => {
      if (Date.parse(a.created) < Date.parse(b.created)) 
        return -1
      if (Date.parse(a.created) > Date.parse(b.created))
        return 1
      return 0
    })
  }, [])

  useEffect(() => {
    setEmptyRow(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0)
  }, [])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return(
    <>
      <div className={styles.btnContainer}>
        <Button
          variant='contained'
          size='large'
          color='secondary'
        >
          Create Order
        </Button>
        </div>
    
      <TableContainer>
        <Table sx={{ minWidth: 600 }} aria-label='orders table'>
          <TableHead sx={{ background: '#FB8500'}}>
            <TableRow>
              <TableCell align='center'>Info</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData).map((row:IOrders, index: number) => (
              <OrderRow rowData={row} index={index} key={index} handleUpdateOpen={handleUpdateOpen}/>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UpdateOrder open={open} handleUpdateClose={handleUpdateClose}/>
    </>
  )
}