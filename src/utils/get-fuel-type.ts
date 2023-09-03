const fuelTypes = {
  2: 'ბენზინი',
  3: 'დიზელი',
  7: 'ელექტრო',
  6: 'ჰიბრიდი',
  10: 'დატ.ჰიბრიდი',
  9: 'თხევადი გაზი',
  8: 'ბუნ. გაზი',
  12: 'წყალბადი',
}

export const getFuelType = (id: number) => {
  const fuelType = fuelTypes[id as keyof typeof fuelTypes]
  return fuelType || ''
}
