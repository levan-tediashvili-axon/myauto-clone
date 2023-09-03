const locations = {
  2: 'თბილისი',
  3: 'ქუთაისი',
  4: 'ბათუმი',

  7: 'ფოთი',
  15: 'რუსთავი',
  23: 'გზაში საქ.-კენ',
  21: 'აშშ',
}

export const getLocation = (id: number) => {
  const location = locations[id as keyof typeof locations]
  return location || 'თბილისი'
}
