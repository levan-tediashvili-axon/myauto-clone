import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row, Stack } from 'react-bootstrap'
import { BikeIcon, CarIcon, DashIcon, TractorIcon } from 'src/assets'
import { Select } from 'src/components'

export const FilterForm = () => {
  const [vehicleType, setVehicleType] = useState(0)

  const vehicleTypes = [
    { value: 0, Icon: CarIcon },
    { value: 1, Icon: TractorIcon },
    { value: 2, Icon: BikeIcon },
  ]

  return (
    <Form className="w-250px shadow-2">
      <ButtonGroup
        className="bg-white equal-width-buttons w-100"
        onChange={(e: React.SyntheticEvent) => console.log(e.target)}
      >
        {vehicleTypes.map(({ value, Icon }) => (
          <Button
            variant="secondary"
            onClick={() => setVehicleType(value)}
            className={vehicleType === value ? 'active' : undefined}
          >
            <Icon />
          </Button>
        ))}
      </ButtonGroup>
      <Stack className="pb-4 px-24px pt-22px bg-white border-bottom border-end border-start border-solid-1 border-gray-200">
        <Select
          controlId="dealType"
          label="გარიგების ტიპი"
          options={['იყიდება', 'ქირავდება']}
        />
        <Select
          controlId="manufacturer"
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
      <Stack
        className="pt-3 px-24px bg-white border-bottom border-end border-start border-solid-1 border-gray-200"
        direction="vertical"
        style={{ paddingBottom: '44px' }}
      >
        <Stack direction="horizontal" className="justify-content-between">
          <Form.Label>ფასი</Form.Label>
          <p>switch</p>
        </Stack>
        <Stack direction="horizontal" gap={1}>
          <Form.Control type="number" placeholder="დან" />
          <DashIcon />
          <Form.Control type="number" placeholder="მდე" />
        </Stack>
      </Stack>
      <Stack className="pt-3 px-24px pb-3 bg-white shadow-1 border-bottom border-end border-start border-solid-1 border-gray-200">
        <Button className="w-100" type="submit">
          ძებნა
        </Button>
      </Stack>
    </Form>
  )
}
