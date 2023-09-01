import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IManufacturer, getManufacturers } from 'src/api'
import { BikeIcon, CarIcon, DashIcon, TractorIcon } from 'src/assets'
import { Select } from 'src/components'

export type FilterInputs = {
  manufacturers: Array<IManufacturer>
}

export const FilterForm = () => {
  const formMethods = useForm<FilterInputs>()
  const { handleSubmit, control } = formMethods
  const manufacturersField = useFieldArray({
    control,
    name: 'manufacturers',
  })

  const [vehicleType, setVehicleType] = useState(0)

  const $manufacturers = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
  })

  const vehicleTypes = [
    { value: 0, Icon: CarIcon },
    { value: 1, Icon: TractorIcon },
    { value: 2, Icon: BikeIcon },
  ]

  if ($manufacturers.data === undefined) {
    return null
  }
  const manufacturers = $manufacturers.data

  return (
    <FormProvider {...formMethods}>
      <Form
        className="w-250px shadow-2"
        onSubmit={handleSubmit((values) => console.log(values))}
      >
        <ButtonGroup
          className="bg-white equal-width-buttons w-100"
          onChange={(e: React.SyntheticEvent) => console.log(e.target)}
        >
          {vehicleTypes.map(({ value, Icon }) => (
            <Button
              key={value}
              variant="secondary"
              onClick={() => setVehicleType(value)}
              className={vehicleType === value ? 'active' : undefined}
            >
              <Icon />
            </Button>
          ))}
        </ButtonGroup>
        <Stack className="pb-4 px-24px pt-22px bg-white border-bottom border-end border-start border-solid-1 border-gray-200">
          <Controller
            control={control}
            name="manufacturers"
            render={() => (
              <Select
                label="მწარმოებელი"
                identifier="man_id"
                options={manufacturers}
                placeholder="ყველა მწარმოებელი"
                renderOption={(option) => option.man_name}
                value={manufacturersField.fields}
                onChange={({ option, isChecked, checkedIndex }) => {
                  if (isChecked) {
                    manufacturersField.remove(checkedIndex)
                  } else {
                    manufacturersField.append(option)
                  }
                }}
              />
            )}
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
    </FormProvider>
  )
}
