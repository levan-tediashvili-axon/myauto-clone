import { GetProductsInput } from './products/products.api'

export const createQueryString = (input: GetProductsInput) => {
  const query = new URLSearchParams({
    ForRent: input.forRent,
    Page: input.page.toString(),
    SortOrder: input.setOrder,
    CurrencyID: input.currencyId,
  })

  if (input.mans.length > 0) {
    query.set('Mans', input.mans.join('.'))
  }

  if (input.priceFrom.length > 0) {
    query.set('PriceFrom', input.priceFrom)
  }

  if (input.priceTo.length > 0) {
    query.set('PriceTo', input.priceTo)
  }

  return query
}
