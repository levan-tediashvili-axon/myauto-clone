import axios from 'axios'
import { IManufacturer } from './manufacturers.codecs'

export const getManufacturers = async () => {
  const url = 'https://static.my.ge/myauto/js/mans.json'
  const result = await axios.get(url)
  const data = result.data

  // TODO. Decode and validate json instead of returning as IManufacturer
  return data as Array<IManufacturer>
}

type GetManufacturerModelsInput = {
  manufacturerId: string | null
}
export const getManufacturerModels = async ({
  manufacturerId,
}: GetManufacturerModelsInput) => {
  if (manufacturerId === null) {
    return
  }
  const url = `https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`

  const result = await axios.get(url)
  const data = result.data

  return data
}
