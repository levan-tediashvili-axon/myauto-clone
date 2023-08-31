import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

type BreadcrumbItem = {
  id: string
  name: string
  href?: string
  active?: boolean
}

type Props = {
  items: Array<BreadcrumbItem>
}
export const Breadcrumbs = ({ items }: Props) => {
  return (
    <Breadcrumb>
      {items.map((item) => (
        <Breadcrumb.Item key={item.id} href={item.href} active={item.active}>
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
