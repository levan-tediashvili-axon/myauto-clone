import constate from 'constate'
import { useState } from 'react'

function useCurrency() {
  const [currency, setCurrency] = useState(1)
  const switchCurrency = () => setCurrency((prev) => (prev === 1 ? 3 : 1))
  return { currency, switchCurrency }
}

const [CurrencyProvider, useCurrencyContext] = constate(useCurrency)

export { CurrencyProvider, useCurrencyContext }
