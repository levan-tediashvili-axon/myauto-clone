import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { IManufacturer, getManufacturers } from 'src/api'
import { Select } from 'src/components'
import { BikeIcon, CarIcon, DashIcon, TractorIcon } from 'src/assets'
import { getCategories } from 'src/api/categories/categories.api'
import { filterCategories } from 'src/utils/filter-categories'
import { filterManufacturers } from 'src/utils/filter-manufacturers'
import { ICategory } from 'src/api/categories/categories.codecs'

type ICurrency = {
  label: 'GEL' | 'USD'
  id: 3 | 1
}

export type FilterInputs = {
  vehicleType: 0 | 1 | 2
  manufacturers: Array<IManufacturer>
  categories: Array<ICategory>
  currency: ICurrency
  priceFrom: string
  priceTo: string
}

const defaultValues: FilterInputs = {
  vehicleType: 0,
  manufacturers: [],
  categories: [],
  currency: { label: 'GEL', id: 3 },
  priceFrom: '',
  priceTo: '',
}

export const FilterForm = () => {
  const { handleSubmit, control, setValue, watch } = useForm<FilterInputs>({
    defaultValues,
  })

  const manufacturersField = useFieldArray({
    control,
    name: 'manufacturers',
  })

  const categoriesField = useFieldArray({
    control,
    name: 'categories',
  })
  const vehicleType = watch('vehicleType')

  const $manufacturers = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
  })
  const $categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const vehicleTypes = [
    { value: 0, Icon: CarIcon },
    { value: 1, Icon: TractorIcon },
    { value: 2, Icon: BikeIcon },
  ] as const

  if ($manufacturers.data === undefined || $categories.data === undefined) {
    return null
  }
  const manufacturers = $manufacturers.data
  const categories = $categories.data

  const filteredCategories = filterCategories({ categories, vehicleType })
  const filteredManufacturers = filterManufacturers({
    manufacturers,
    vehicleType,
  })

  return (
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
            onClick={() => {
              if (value !== vehicleType) {
                setValue('manufacturers', [])
                setValue('categories', [])
              }
              setValue('vehicleType', value)
            }}
            className={vehicleType === value ? 'active' : undefined}
          >
            <Icon />
          </Button>
        ))}
      </ButtonGroup>
      <Stack className="pb-4 px-24px pt-22px bg-white border-bottom border-end border-start border-solid-1 border-gray-200">
        {/* TODO. Do we need <Controller/> at all? */}
        <Controller
          control={control}
          name="manufacturers"
          render={() => (
            <Select
              label="მწარმოებელი"
              identifier="man_id"
              options={filteredManufacturers}
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
              onClear={() => setValue('manufacturers', [])}
            />
          )}
        />

        <Select
          label="კატეგორია"
          identifier="category_id"
          options={filteredCategories}
          placeholder="ყველა კატეგორია"
          renderOption={(option) => option.title}
          value={categoriesField.fields}
          onChange={({ option, isChecked, checkedIndex }) => {
            if (isChecked) {
              categoriesField.remove(checkedIndex)
            } else {
              categoriesField.append(option)
            }
          }}
          onClear={() => setValue('categories', [])}
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
          <Controller
            name="priceFrom"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} placeholder="დან" />
            )}
          />
          <DashIcon />
          <Controller
            name="priceTo"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} placeholder="მდე" />
            )}
          />
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
