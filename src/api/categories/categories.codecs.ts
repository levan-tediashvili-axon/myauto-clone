export type ICategory = {
  category_id: number
  category_type: number
  has_icon: 1 | 0
  title: string
  seo_title: string
  vehicle_types: Array<number>
}
