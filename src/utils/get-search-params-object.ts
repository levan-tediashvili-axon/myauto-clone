import { FilterInputs } from 'src/features/products-list/filter-form'

export const getFilterInputSearchParams = (values: FilterInputs) => {
  return {
    TypeID: values.vehicleType.toString(),
    ForRent: values.bargainType?.type.toString() || '',
    Mans: values.manufacturers.map((man) => man.man_id).join('-'),
    Cats: values.categories.map((cat) => cat.category_id).join('.'),
    CurrencyID: values.currency.id.toString(),
    PriceFrom: values.priceFrom,
    PriceTo: values.priceTo,
  }
}
