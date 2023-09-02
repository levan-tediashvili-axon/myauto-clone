export type IManufacturer = {
  man_id: string
  man_name: string
  is_car: '0' | '1'
  is_spec: '0' | '1'
  is_moto: '0' | '1'
}

export type IModel = {
  cat_man_id: number
  cat_model_id: number
  cat_modif_id: number
  is_car: boolean
  is_moto: boolean
  is_spec: boolean
  man_id: number
  model_group: string
  model_id: number
  model_name: string
  show_in_salons: number
  shown_in_slider: number
  sort_order: number
}
