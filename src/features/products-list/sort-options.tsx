import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { Select } from 'src/components'

type SelectOption = {
  label: string
  value: string
}

const periodOptions = [
  { label: 'ბოლო 1 საათი', value: '1h' },
  { label: 'ბოლო 2 საათი', value: '2h' },
  { label: 'ბოლო 3 საათი', value: '3h' },
  { label: 'ბოლო 1 დღე', value: '1d' },
  { label: 'ბოლო 2 დღე', value: '2d' },
  { label: 'ბოლო 3 დღე', value: '3d' },
  { label: 'ბოლო 1 კვირა', value: '1w' },
  { label: 'ბოლო 2 კვირა', value: '2w' },
  { label: 'ბოლო 3 კვირა', value: '3w' },
]

const sortOrderOptions = [
  { label: 'თარიღი კლებადი', value: '1' },
  { label: 'თარიღი ზრდადი', value: '2' },
  { label: 'ფასი კლებადი', value: '3' },
  { label: 'ფასი ზრდადი', value: '4' },
  { label: 'გარბენი კლებადი', value: '5' },
  { label: 'გარბენი ზრდადი', value: '6' },
]

type Props = {
  total: number
}
export const SortOptions = ({ total }: Props) => {
  const [period, setPeriod] = useState<SelectOption | null>(null)
  const [sortOrder, setSortOrder] = useState<SelectOption>(sortOrderOptions[0])
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsObject = Object.fromEntries(searchParams)
  return (
    <Stack
      direction="horizontal"
      className="align-items-center justify-content-between"
    >
      <p className="m-0">{`${total} განცხადება`}</p>
      <Stack direction="horizontal" gap={2}>
        <Select
          identifier="value"
          placeholder="პერიოდი"
          value={period}
          options={periodOptions}
          onChange={(option) => {
            setPeriod(option)
            setSearchParams({
              ...searchParamsObject,
              Period: option?.value || '',
            })
          }}
          renderOption={(option) => option?.label || ''}
          renderValue={(value) => value?.label || ''}
          classNames="w-140px bg-white border-radius-6"
        />
        <Select
          identifier="value"
          placeholder="სორტირება"
          value={sortOrder}
          options={sortOrderOptions}
          onChange={(option) => {
            setSortOrder(option)
            setSearchParams({
              ...searchParamsObject,
              SortOrder: option?.value || '',
            })
          }}
          renderOption={(option) => option?.label || ''}
          renderValue={(value) => value?.label || ''}
          classNames="w-164px bg-white border-radius-6"
        />
      </Stack>
    </Stack>
  )
}
