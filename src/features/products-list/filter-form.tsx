import React, { useState } from 'react'

import { Button, ButtonGroup, Form, Stack } from 'react-bootstrap'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { IManufacturer } from 'src/api'
import { LoadingButton, MultiSelect } from 'src/components'
import { BikeIcon, CarIcon, DashIcon, TractorIcon } from 'src/assets'
import { filterCategories } from 'src/utils/filter-categories'
import { filterManufacturers } from 'src/utils/filter-manufacturers'
import { ICategory } from 'src/api/categories/categories.codecs'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from 'src/api/products/products.api'
import { getFilterInputSearchParams } from 'src/utils/get-search-params-object'
import { useDebounce } from 'react-use'

type ICurrency = {
  label: 'GEL' | 'USD'
  id: 3 | 1
}

type IBargainType = {
  label: string
  type: 0 | 1
}

export type FilterInputs = {
  bargainType: IBargainType | null
  vehicleType: 0 | 1 | 2
  manufacturers: Array<IManufacturer>
  categories: Array<ICategory>
  currency: ICurrency
  priceFrom: string
  priceTo: string
}
const gel = { label: 'GEL', id: 3 } as ICurrency
const usd = { label: 'USD', id: 1 } as ICurrency
const bargainTypes = [
  { label: 'იყიდება', type: 0 },
  { label: 'ქირავდება', type: 1 },
] as Array<IBargainType>

const defaultValues: FilterInputs = {
  vehicleType: 0,
  bargainType: bargainTypes[0],
  manufacturers: [],
  categories: [],
  currency: usd,
  priceFrom: '',
  priceTo: '',
}

type Props = {
  manufacturers: Array<IManufacturer>
  categories: Array<ICategory>
}
export const FilterForm = ({ manufacturers, categories }: Props) => {
  const { handleSubmit, control, setValue, watch } = useForm<FilterInputs>({
    defaultValues,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_searchParams, setSearchParams] = useSearchParams()
  const [queryString, setQueryString] = useState('')
  const values = watch()

  useDebounce(
    () => {
      setQueryString(
        new URLSearchParams(getFilterInputSearchParams(values)).toString(),
      )
    },
    700,
    [values],
  )

  const $products = useQuery({
    queryKey: ['products', queryString],
    queryFn: () => getProducts(queryString),
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
  const currency = watch('currency')

  const vehicleTypes = [
    { value: 0, Icon: CarIcon },
    { value: 1, Icon: TractorIcon },
    { value: 2, Icon: BikeIcon },
  ] as const

  const filteredCategories = filterCategories({ categories, vehicleType })
  const filteredManufacturers = filterManufacturers({
    manufacturers,
    vehicleType,
  })

  const onSubmit = (values: FilterInputs) => {
    setSearchParams(getFilterInputSearchParams(values))
  }

  return (
    <Form
      className="w-250px shadow-2 position-sticky top-0"
      onSubmit={handleSubmit(onSubmit)}
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
      <Stack className="pb-4 px-24px pt-22px bg-white border-bottom border-end border-start border-solid-1 border-gray-200 gap-20px">
        <Controller
          control={control}
          name="bargainType"
          render={({ field }) => (
            <MultiSelect
              label="გარიგების ტიპი"
              identifier="type"
              options={bargainTypes}
              placeholder="გარიგების ტიპი"
              renderOption={(option) => option?.label || ''}
              renderValue={(value) =>
                Array.isArray(value) ? '' : value?.label || ''
              }
              value={field.value}
              onChange={({ option }) => {
                field.onChange(option)
              }}
              onClear={() => setValue('bargainType', null)}
            />
          )}
        />
        {/* TODO. Do we need <Controller/> at all? */}
        <Controller
          control={control}
          name="manufacturers"
          render={() => (
            <MultiSelect
              label="მწარმოებელი"
              identifier="man_id"
              options={filteredManufacturers}
              placeholder="ყველა მწარმოებელი"
              renderOption={(option) => option.man_name}
              renderValue={(value) =>
                Array.isArray(value)
                  ? value.map((option) => option.man_name).join(', ')
                  : ''
              }
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

        <MultiSelect
          label="კატეგორია"
          identifier="category_id"
          options={filteredCategories}
          placeholder="ყველა კატეგორია"
          renderOption={(option) => option.title}
          renderValue={(value) =>
            Array.isArray(value)
              ? value.map((option) => option.title).join(', ')
              : ''
          }
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
        gap={2}
      >
        <Stack direction="horizontal" className="justify-content-between">
          <Form.Label>ფასი</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            className="custom-switch"
            checked={currency.id === usd.id}
            onChange={() => {
              if (currency.id === gel.id) {
                setValue('currency', usd)
              } else {
                setValue('currency', gel)
              }
            }}
            label={
              <Stack>
                <span>₾</span>
                <span>$</span>
              </Stack>
            }
          />
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
        <LoadingButton
          className="w-100"
          type="submit"
          loading={$products.isLoading}
        >{`ძებნა ${
          $products.data?.meta.total.toLocaleString() || ''
        }`}</LoadingButton>
      </Stack>
    </Form>
  )
}
