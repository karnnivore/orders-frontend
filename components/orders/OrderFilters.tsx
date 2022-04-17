import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./css/OrderFilters.module.css"
import { IOrders } from "./AllOrders"
import { useTransformToUpper } from "../../hooks/useTransformToUpper"
import { IFilters } from "../../models/IFilters"


interface IOrderFilters {
  data: IOrders[]
  filters: IFilters
  setFilters: Dispatch<SetStateAction<IFilters>>
}

export const OrderFilters = ({
  data,
  filters,
  setFilters
}: IOrderFilters) => {
  const [uniqueSizes, setUniqueSizes] = useState<string[]>([''])
  const [uniqueConditions, setUniqueConditions] = useState<string[]>([''])
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([''])

  // get unique sizes, conditions and type
  useEffect(() => {
    let tempSizes = []
    tempSizes = [...new Set(data.map(order => order.size))]
    setUniqueSizes(tempSizes)

    // unique conditions
    let tempConditions = []
    tempConditions = [...new Set(data.map(order => order.condition))]
    setUniqueConditions(tempConditions)

    // unique sizes
    let tempTypes = []
    tempTypes = [...new Set(data.map(order => order.type))]
    setUniqueTypes(tempTypes)
  }, [data])

  // filter data
  useEffect(() => {
    let tempData = data.filter((order) => {
      return order.status === filters.status
    })

    if (tempData !== []) {
    }
    console.log(tempData)
  }, [filters])

  // handlers to set filter state
  const handleStatusChange = (event: SelectChangeEvent) => {
    setFilters({ 
      ...filters, 
      status: event.target.value
    })
  }

  const handleSizeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setFilters({
      ...filters,
      size: event.target.value
    })
  }

  const handleConditionChange = (event: SelectChangeEvent) => {
    setFilters({
      ...filters,
      condition: event.target.value
    })
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setFilters({
      ...filters,
      type: event.target.value
    })
  }

  const resetFilters = () => {
    setFilters({
      status: '',
      size: '',
      condition: '',
      type: ''
    })
  }
  
  return(
    <Paper className={styles.paper}>
      <div className={styles.headerContainer}>
        <Typography variant="h4">
          All Orders
        </Typography>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.filters}>
          <FormControl className={styles.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label='Status'
              onChange={handleStatusChange}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'in-progress'}>In Progress</MenuItem>
              <MenuItem value={'delivered'}>Delivered</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel>Size</InputLabel>
            <Select
              value={filters.size}
              label='Size'
              onChange={handleSizeChange}
            >
              <MenuItem value={''}>None</MenuItem>
              {uniqueSizes.map(size => {
                return(
                  <MenuItem
                    value={size}
                    key={size}
                  >
                    {size}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel>Condition</InputLabel>
            <Select
              value={filters.condition}
              label='Condition'
              onChange={handleConditionChange}
            >
              <MenuItem value={''}>None</MenuItem>
              {uniqueConditions.map(condition => {
                return(
                  <MenuItem
                    value={condition}
                    key={condition}
                  >
                    {useTransformToUpper(condition)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label='Type'
              onChange={handleTypeChange}
            >
              <MenuItem value={''}>None</MenuItem>
              {uniqueTypes.map(type => {
                return(
                  <MenuItem
                    value={type}
                    key={type}
                  >
                    {useTransformToUpper(type)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.resetContainer}>
          <Button
            variant="contained"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </Paper>
  )
}