import React from 'react'
import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Layout } from 'src/components/layout/layout'

const breadcrumbItems = [{ id: '1', name: 'მთავარი', active: true }]

export const Home = () => {
  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <Stack>
        <Link to="/search">ძებნა</Link>
      </Stack>
    </Layout>
  )
}
