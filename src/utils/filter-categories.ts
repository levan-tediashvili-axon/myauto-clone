import { ICategory } from 'src/api/categories/categories.codecs'

type FilterCategoriesInput = {
  categories: Array<ICategory>
  vehicleType: 0 | 1 | 2
}

export const filterCategories = ({
  categories,
  vehicleType,
}: FilterCategoriesInput) => {
  return categories.filter((category) =>
    category.vehicle_types.includes(vehicleType),
  )
}
