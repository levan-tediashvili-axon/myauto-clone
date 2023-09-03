import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
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
    <Breadcrumb className="mt-32px mb-20px">
      {items.map((item) => (
        <Breadcrumb.Item
          className="text-decoration-none"
          key={item.id}
          href={item.href}
          active={item.active}
          linkAs={Link}
          linkProps={{ to: item.href }}
        >
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
