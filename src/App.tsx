import { ProductsList, Home } from './features'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/App.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CurrencyProvider } from './contexts'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <ProductsList />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </CurrencyProvider>
    </QueryClientProvider>
  )
}

export default App
