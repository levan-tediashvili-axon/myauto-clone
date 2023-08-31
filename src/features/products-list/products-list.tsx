import React from 'react'
import { Stack } from 'react-bootstrap'
import { FilterForm } from './filter-form'

export const ProductsList = () => {
  return (
    <Stack direction="horizontal">
      <FilterForm />
    </Stack>
  )
}
