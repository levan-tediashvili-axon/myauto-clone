import { useQuery } from '@tanstack/react-query'
import { Stack } from 'react-bootstrap'
import { FilterForm } from './filter-form'
import { getProducts } from 'src/api/products/products.api'

export const ProductsList = () => {
  const args = {
    forRent: '0' as const,
    mans: [],
    cats: ['2', '3'],
    priceFrom: '5000',
    priceTo: '10000',
    period: null,
    setOrder: '1' as const,
    page: 2,
    currencyId: '1',
  }
  const $products = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(args),
  })

  if ($products.data === undefined) {
    return null
  }

  const products = $products.data
  return (
    <Stack direction="horizontal">
      <FilterForm />
      <Stack>
        {products.items.map((item) => (
          <Stack direction="horizontal" gap={2}>
            <p>{item.car_run_km}</p>
            <p>{item.price}</p>
            <p>{item.price_usd}</p>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
