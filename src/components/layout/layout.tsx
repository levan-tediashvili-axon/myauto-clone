import React from 'react'
import { Header } from '../header'
import { Container, Stack } from 'react-bootstrap'
import { BreadcrumbItem, Breadcrumbs } from '../breadcrumbs'

type Props = {
  children: React.ReactElement
  breadcrumbItems: Array<BreadcrumbItem>
}
export const Layout = ({ children, breadcrumbItems }: Props) => {
  return (
    <>
      <Header />
      <Container>
        <Stack>
          <Breadcrumbs items={breadcrumbItems} />
          {children}
        </Stack>
      </Container>
    </>
  )
}
