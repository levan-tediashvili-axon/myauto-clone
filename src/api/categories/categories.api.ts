import axios from 'axios'
import { ICategory } from './categories.codecs'

export const getCategories = async () => {
  const url = 'https://api2.myauto.ge/ka/cats/get'

  const result = await axios.get(url)
  const data = result.data
  return data.data as Array<ICategory>
}
