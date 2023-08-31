import React from 'react'
import { Form } from 'react-bootstrap'

type Props = {
  controlId: string
  options: Array<string>
  label: string
  multiSelect?: boolean
  placeholder?: string
}

export const Select = ({ controlId, options, label, placeholder }: Props) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label className="mb-2 text-gray-800">{label}</Form.Label>
      <Form.Select placeholder={placeholder}>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
