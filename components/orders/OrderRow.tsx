import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardContent, CardMedia, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useTransformToUpper } from '../../hooks/useTransformToUpper'
import { IOrders } from '../../models/IOrders'
import { StatusBadge } from './StatusBadge'

interface IOrderRow {
  rowData: IOrders
  index: number
  handleUpdateOpen: () => void
  setOrder: Dispatch<SetStateAction<IOrders>>
}
export const OrderRow = (props: IOrderRow) => {
  const row = props.rowData
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <TableRow style={props.index % 2 ? { background: '#e6e6e6' } : { background: 'white' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.created}
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>{(useTransformToUpper(row.condition))}</TableCell>
        <TableCell>{(useTransformToUpper(row.type))}</TableCell>
        <TableCell align='center'>{<StatusBadge status={row.status}/>}</TableCell>
        <TableCell align='center'>
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              props.handleUpdateOpen()
              props.setOrder(props.rowData)
            }}
          >
            Update
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Card onClick={() => setOpen(false)} sx={{ width: 'full-width'}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div' sx={{ paddingLeft: 2}}>
                    SKU: <span style={{fontWeight: 300}}>{row.sku}</span>
                  </Typography>
                  <Table size='small' aria-label='purchases'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Origin Address</TableCell>
                        <TableCell>Shipping Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{row.origin_address}</TableCell>
                        <TableCell>{row.shipping_address}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardMedia
                  component='img'
                  sx={{ height: 500, width: 500}}
                  image={row.photo}
                  alt="Shipping container picture"
                />
              </CardActionArea>   
            </Card>       
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}