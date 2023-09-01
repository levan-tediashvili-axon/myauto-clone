import { Dropdown, Form } from 'react-bootstrap'

type Props<T> = {
  options: Array<T>
  label: string
  placeholder?: string
  renderOption: (option: T) => string
  value: Array<T>
  onChange: (input: {
    option: T
    isChecked: boolean
    checkedIndex: number
  }) => void
  identifier: string
}

// https://react-bootstrap.netlify.app/docs/components/overlays

export const Select = <T,>({
  options,
  placeholder,
  renderOption,
  value,
  onChange,
  identifier,
}: Props<T>) => {
  const getCheckedBoolean = (option: T) => {
    return value.some(
      (elem) => elem[identifier as keyof T] === option[identifier as keyof T],
    )
  }
  const getCheckedIndex = (option: T) => {
    return value.findIndex(
      (elem) => elem[identifier as keyof T] === option[identifier as keyof T],
    )
  }

  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value.map((option) => renderOption(option)).join(', ') || placeholder}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: '500px', overflowY: 'scroll' }}>
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
                onChange={() => null}
                type="checkbox"
                label={renderOption(option)}
                checked={isChecked}
              />
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}
