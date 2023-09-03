import React from 'react'
import { Stack } from 'react-bootstrap'
import { GreenTickIcon } from 'src/assets'

type Props = { customsPassed: boolean }
export const CustomsBadge = ({ customsPassed }: Props) => {
  if (customsPassed) {
    return (
      <Stack direction="horizontal" className="align-items-center" gap={1}>
        <GreenTickIcon />
        <p className="text-success m-0 font-size-11">განბაჟებული</p>
      </Stack>
    )
  }

  // TODO. add customs cost
  return <p className="text-danger m-0 font-size-11">განბაჟება 2,176 ₾</p>
}
