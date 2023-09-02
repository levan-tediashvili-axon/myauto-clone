import { IManufacturer } from 'src/api/manufacturers/manufacturers.codecs'

type FilterManufacturersInput = {
  manufacturers: Array<IManufacturer>
  vehicleType: 0 | 1 | 2
}

export const filterManufacturers = ({
  manufacturers,
  vehicleType,
}: FilterManufacturersInput) => {
  return manufacturers.filter((manufacturer) => {
    const manufacturerVehicleTypes: Array<0 | 1 | 2> = []

    if (manufacturer.is_car === '1') {
      manufacturerVehicleTypes.push(0)
    }

    if (manufacturer.is_spec === '1') {
      manufacturerVehicleTypes.push(1)
    }

    if (manufacturer.is_moto === '1') {
      manufacturerVehicleTypes.push(2)
    }

    return manufacturerVehicleTypes.includes(vehicleType)
  })
}
