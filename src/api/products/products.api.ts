import axios from 'axios'
import { createQueryString } from '../create-query-params'
import { IProduct } from './products.codecs'

export type GetProductsInput = {
  forRent: '0' | '1'
  mans: Array<string>
  cats: Array<string>
  priceFrom: string
  priceTo: string
  period: '1h' | '2h' | '3h' | '1d' | '2d' | '3d' | '1w' | '2w' | '3w' | null
  setOrder: '1' | '2' | '3' | '4' | '5' | '6'
  page: number
  currencyId: string
}

export const getProducts = async (input: GetProductsInput) => {
  const baseUrl = 'https://api2.myauto.ge/ka/products'
  const query = createQueryString(input)
  const url = `${baseUrl}?${query}`
  const result = await axios.get(url)
  const data = result.data

  console.log(data.data)

  return data.data as {
    items: Array<IProduct>
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}
