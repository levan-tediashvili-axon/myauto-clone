import axios from 'axios'

import { IProduct } from './products.codecs'

export const getProducts = async (query: string) => {
  const baseUrl = 'https://api2.myauto.ge/ka/products'
  const url = `${baseUrl}?${query}`
  const result = await axios.get(url)
  const data = result.data

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
