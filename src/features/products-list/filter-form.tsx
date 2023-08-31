import React from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Select } from 'src/components'

export const FilterForm = () => {
  return (
    <Form className="bg-white">
      <ButtonGroup className="bg-white">
        <Button variant="secondary">Left</Button>
        <Button variant="secondary" className="active">
          Middle
        </Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
      <Stack className="pb-4 border-bottom border-solid-1 border-gray-200">
        <Select
          controlId="dealType"
          label="გარიგების ტიპი"
          options={['იყიდება', 'ქირავდება']}
        />
        <Select
          controlId="producer"
          label="მწარმოებელი"
          options={['BMW', 'Mercedes']}
          placeholder="ყველა მწარმოებელი"
          multiSelect
        />
        <Select
          controlId="category"
          label="კატეგორია"
          options={['BMW', 'Mercedes']}
          placeholder="ყველა კატეგორია"
          multiSelect
        />
      </Stack>
      <Button className="w-100" type="submit">
        ძებნა
      </Button>
    </Form>
  )
}
