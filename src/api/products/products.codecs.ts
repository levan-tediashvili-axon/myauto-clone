export type IProduct = {
  car_model: string
  customs_passed: boolean
  price: number
  price_usd: number
  price_value: number
  prod_month: number
  prod_year: number
  car_run: number
  car_run_dim: number // km===1 miles===?
  car_run_km: number
  for_rent: boolean
  photo: string
  car_id: number
  photo_ver: number
  man_id: number
  engine_volume: number
  fuel_type_id: number // ბენზინი = 2, დიზელი=3 ელექტრო=7 ჰიბრიდი=6 დატ.ჰიბრიდი=10 თხ.გაზი=9  ბუნ.გაზი=8 წყალბდი=12
  gear_type_id: number // ავტომატიკა=2 მექანიკა=1 ტიპტრონიკი=3  ვარიატორი=4
  right_wheel: boolean
  location_id: number // თბილისი=2
}
