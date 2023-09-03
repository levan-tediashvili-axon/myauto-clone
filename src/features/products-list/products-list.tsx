import { useQuery } from '@tanstack/react-query'
import { Stack } from 'react-bootstrap'
import { FilterForm } from './filter-form'
import { getProducts } from 'src/api/products/products.api'
import { Layout } from 'src/components/layout/layout'
import { useLocation } from 'react-router-dom'
import { ProductsListItem } from './products-list-item'
import { getManufacturers } from 'src/api'
import { getCategories } from 'src/api/categories/categories.api'
import { SortOptions } from './sort-options'

const breadcrumbItems = [
  { id: '1', name: 'მთავარი', href: '/' },
  { id: '2', name: 'ძიება', active: true },
]

export const ProductsList = () => {
  const location = useLocation()

  const $manufacturers = useQuery({
    queryKey: ['manufacturers'],
    queryFn: getManufacturers,
    refetchOnWindowFocus: false,
  })
  const $categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  })

  const queryString = location.search.slice(1) // TODO. Validate query string before passing it to API

  const $products = useQuery({
    queryKey: ['products', queryString],
    queryFn: () => getProducts(queryString),
    keepPreviousData: true,
  })

  if (
    $products.data === undefined ||
    $manufacturers.data === undefined ||
    $categories.data === undefined
  ) {
    return null
  }

  const manufacturers = $manufacturers.data
  const categories = $categories.data
  const products = $products.data

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <Stack
        direction="horizontal"
        className="position-relative align-items-start gap-20px"
      >
        <FilterForm manufacturers={manufacturers} categories={categories} />
        <Stack gap={3}>
          <SortOptions total={products.meta.total} />
          <Stack
            className={`gap-10px ${
              $products.isPreviousData ? 'opacity-05' : ''
            }`}
          >
            {products.items.map((product) => {
              const manufacturer = manufacturers.find(
                (man) => Number(man.man_id) === product.man_id,
              )
              return (
                <ProductsListItem
                  key={product.car_id}
                  product={product}
                  manufacturer={manufacturer}
                />
              )
            })}
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}
