import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { OrderRow } from './OrderRow'
import { IFilters } from '../../models/IFilters'
import { UpdateOrder } from './updateOrder/UpdateOrder'
import { IOrders } from '../../models/IOrders'
import styles from './css/AllOrders.module.css'
import Link from 'next/link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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
  const [order, setOrder] = useState<IOrders>({
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

  const [sortObj, setSortObj] = useState({
    column: '',
    sortDirection: ''
  })

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
    dateHeaderSort()
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

  // function to sort table columns
  const tableHeaderSort = (colName: string) => {
    let sortedData = filteredData
    if (sortObj.column != colName){
      setSortObj({
        column: colName,
        sortDirection: 'asc'
      })
    } else {
      if (sortObj.sortDirection === 'desc') {
        setSortObj({
          ...sortObj,
          sortDirection: 'asc'
        })
      } else {
        setSortObj({
          ...sortObj,
          sortDirection: 'desc'
        })
      }
    }
    if (sortObj.sortDirection === 'desc') {
      sortedData.sort((a, b) => {
        return a[colName].localeCompare(b[colName])
      })
    } 
    if (sortObj.sortDirection === 'asc') {
      sortedData.sort((a, b) => {
        return b[colName].localeCompare(a[colName])
      })
    }
    setFilteredData(sortedData)
    console.log("data sorted: ", sortedData)
  }

  // function to sort date header
  const dateHeaderSort = () => {
    let sortedData = filteredData
    if (sortObj.column !== 'created') {
      setSortObj({
        column: 'created',
        sortDirection: 'asc'
      })
    } else {
      if (sortObj.sortDirection === 'desc') {
        setSortObj({
          ...sortObj,
          sortDirection: 'asc'
        })
      } else {
        setSortObj({
          ...sortObj,
          sortDirection: 'desc'
        })
      }
    }
    if (sortObj.sortDirection === 'desc') {
      sortedData.sort((a, b) => {
        if (Date.parse(a.created) > Date.parse(b.created)) 
          return 1
        if (Date.parse(a.created) < Date.parse(b.created))
          return -1
      })
    }
    if (sortObj.sortDirection === 'asc') {
      sortedData.sort((a, b) => {
        if (Date.parse(a.created) < Date.parse(b.created)) 
          return 1
        if (Date.parse(a.created) > Date.parse(b.created))
          return -1
      })
    }
  }

  // function to generate sortable table columns
  const generateTableCell = (objName: string, displayString: string) => {
    if (sortObj.column === objName){
      return (
        <TableCell
          onClick={() => tableHeaderSort(objName)}
          align='center'
          key={objName}
        >
          {sortObj.sortDirection === 'asc' ? 
            <div className={styles.sortDirectionCtn}>
              {displayString}
              <ArrowDropUpIcon/> 
            </div>
            : 
            <div className={styles.sortDirectionCtn}>
              {displayString}
              <ArrowDropDownIcon/>
            </div>
          }
        </TableCell>
      )
    } else {
      return (
        <TableCell
          onClick={() => tableHeaderSort(objName)}
          align={objName === 'status' ? 'center' : 'left'}
          key={objName}
        >
          {displayString}
        </TableCell>
      )
    }
  }

  const generateHeaders = () => {
    const headers = [
      {objName: 'id', displayString: 'Id'},
      {objName: 'customer', displayString: 'Customer'},
      {objName: 'size', displayString: 'Size'},
      {objName: 'condition', displayString: 'Condition'},
      {objName: 'type', displayString: 'Type'},
      {objName: 'status', displayString: 'Status'}
    ]
    return headers.map(header => {
      return generateTableCell(header.objName, header.displayString)
    })
  }

  return(
    <>
      <div className={styles.btnContainer}>
        <Link
          href={{
            pathname:'/orders/create'
          }}
        >
          <Button
            variant='contained'
            size='large'
            color='secondary'
          >
            Create Order
          </Button>
        </Link>
        </div>
    
      <TableContainer>
        <Table sx={{ minWidth: 600 }} aria-label='orders table'>
          <TableHead sx={{ background: '#FB8500'}}>
            <TableRow>
              <TableCell align='center'>Info</TableCell>
              {sortObj.column === 'created' ?
              <TableCell
                onClick={dateHeaderSort}
              >
                {sortObj.sortDirection === 'asc' ?
                  <div className={styles.sortDirectionCtn}>
                    Date Created 
                    <ArrowDropUpIcon/>
                  </div>
                  :
                  <div className={styles.sortDirectionCtn}>
                    Date Created 
                    <ArrowDropDownIcon/>
                  </div>
                }
              </TableCell>
              : 
              <TableCell 
                onClick={dateHeaderSort}
              >
                Date Created
              </TableCell>
              }
              {generateHeaders()}
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 
              ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredData).map((row:IOrders, index: number) => (
              <OrderRow rowData={row} index={index} key={index} handleUpdateOpen={handleUpdateOpen} setOrder={setOrder}/>
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
      <UpdateOrder open={open} handleUpdateClose={handleUpdateClose} order={order} filteredData={filteredData} setFilteredData={setFilteredData}/>
    </>
  )
}