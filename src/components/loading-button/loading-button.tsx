import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

type Props = { loading?: boolean } & ButtonProps
export const LoadingButton = ({ loading, children, ...buttonProps }: Props) => {
  return (
    <Button disabled={loading} {...buttonProps}>
      {loading ? (
        <span
          className="spinner-border spinner-border-sm "
          style={{ color: '#FFF' }}
          role="status"
        ></span>
      ) : (
        children
      )}
    </Button>
  )
}
