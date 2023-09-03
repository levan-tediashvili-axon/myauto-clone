import { Dropdown, Stack } from 'react-bootstrap'

type Props<T> = {
  value: T
  options: Array<T>
  label?: string
  placeholder?: string
  renderOption: (option: T) => string
  renderValue: (value: T) => string
  onChange: (option: T) => void
  identifier: string
  classNames?: string
}

export const Select = <T,>({
  options,
  placeholder,
  label,
  renderOption,
  renderValue,
  value,
  onChange,
  identifier,
  classNames,
}: Props<T>) => {
  const getCheckedBoolean = (option: T) => {
    if (value === null || value === undefined) {
      return false
    }

    return value[identifier as keyof T] === option[identifier as keyof T]
  }

  const renderedValue = renderValue(value)

  return (
    <Dropdown autoClose className={classNames}>
      {label && (
        <Dropdown.ItemText className="font-size-12 mb-2">
          {label}
        </Dropdown.ItemText>
      )}
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        // onClick={toggleDropdown}
        className="border w-100 overflow-hidden d-flex align-items-center justify-content-between"
      >
        {renderedValue.length > 0 ? (
          <p className="mw-100 w-100 font-size-13 whitespace-nowrap overflow-hidden text-overflow-ellipsis m-0 text-left">
            {renderedValue}
          </p>
        ) : (
          <p className="text-secondary d-inline m-0 font-size-13">
            {placeholder || ''}
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
            const activeClasses = 'm-0 text-black'
            const normalClasses = 'm-0 text-secondary'

            return (
              <Dropdown.Item
                key={option[identifier as keyof T] as string}
                style={{ backgroundColor: isChecked ? '#F2F3F6' : 'white' }}
                onClick={(e) => {
                  onChange(option)
                }}
              >
                <p className={isChecked ? activeClasses : normalClasses}>
                  {renderOption(option)}
                </p>
              </Dropdown.Item>
            )
          })}
        </Stack>
      </Dropdown.Menu>
    </Dropdown>
  )
}
