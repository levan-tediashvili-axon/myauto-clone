import { useRef } from 'react'
import { Dropdown, Form, Stack } from 'react-bootstrap'

type Props<T> = {
  options: Array<T>
  label: string
  placeholder?: string
  renderOption: (option: T) => string
  renderValue: (value: Array<T> | T) => string
  value: Array<T> | T
  onChange: (input: {
    option: T
    isChecked: boolean
    checkedIndex: number
  }) => void
  onClear: () => void
  identifier: string
}

export const MultiSelect = <T,>({
  options,
  placeholder,
  label,
  renderOption,
  renderValue,
  value,
  onChange,
  onClear,
  identifier,
}: Props<T>) => {
  const dropdownRef = useRef(null)

  // TODO. trigger dropdown programaticallu

  const getCheckedBoolean = (option: T) => {
    if (Array.isArray(value)) {
      return value.some(
        (elem) => elem[identifier as keyof T] === option[identifier as keyof T],
      )
    }

    if (value === null || value === undefined) {
      return false
    }

    return value[identifier as keyof T] === option[identifier as keyof T]
  }
  const getCheckedIndex = (option: T) => {
    if (Array.isArray(value)) {
      return value.findIndex(
        (elem) => elem[identifier as keyof T] === option[identifier as keyof T],
      )
    }
    return -1
  }

  const renderedValue = renderValue(value)
  const showClearButton = Array.isArray(value)
    ? value.length > 0
    : value !== null

  return (
    <Dropdown autoClose="outside" ref={dropdownRef} className="w-100">
      <Dropdown.ItemText className="font-size-12 mb-2">
        {label}
      </Dropdown.ItemText>
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="border w-100 overflow-hidden d-flex align-items-center justify-content-between"
      >
        {renderedValue.length > 0 ? (
          <p className="mw-100 w-100 font-size-13 whitespace-nowrap overflow-hidden text-overflow-ellipsis m-0 text-left">
            {renderedValue}
          </p>
        ) : (
          <p className="text-secondary d-inline m-0 font-size-13">
            {placeholder}
          </p>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 mw-100 bg-white font-size-13">
        <Stack
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {options.map((option) => {
            const isChecked = getCheckedBoolean(option)
            const checkedIndex = getCheckedIndex(option)
            return (
              <Dropdown.Item
                key={option[identifier as keyof T] as string}
                onClick={(e) => {
                  onChange({ option, isChecked, checkedIndex })
                }}
              >
                <Form.Check
                  className="cursor-pointer"
                  onChange={() => null}
                  type="checkbox"
                  label={renderOption(option)}
                  checked={isChecked}
                />
              </Dropdown.Item>
            )
          })}
        </Stack>
        {showClearButton ? (
          <Stack direction="horizontal" className="p-2 border-top border-1">
            <span
              className="d-flex align-items-center h-28px px-8px bg-transparent border-radius-6 text-gray-850 hover-text-gray-800 hover-bg-white font-size-12 cursor-pointer"
              onClick={onClear}
            >
              ფილტრის გასუფთავება
            </span>
            <span
              className="btn btn-primary btn-small font-size-12 fw-400"
              onClick={() => console.log('TODO. close dropdown')}
            >
              არჩევა
            </span>
          </Stack>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  )
}
